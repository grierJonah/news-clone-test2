import React from "react";
import axios from "axios";
import "./individualPost.css";
import AddCommentForm from "./comment_form/addCommentForm";

export default class Random extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			post: [],
			title: props.title,
			comments: [],
			edit_comment: [],
		};
	}

	showPosts() {
		return (
			<div className="individual-post-container">
				<div className="individual-post-header-title">
					{this.state.post.title}
				</div>

				<div className="individual-add-comment">
					<div className="post-comment-container">
						{sessionStorage.getItem("username") ? (
							<AddCommentForm
								blog_title={this.state.post.title}
							/>
						) : null}
					</div>
					<div id="individual-post-back-button">
						<a href="../">Go Back</a>
					</div>
				</div>

				<div className="individual-post-body">
					{this.state.post.body ? (
						this.state.post.body
					) : (
						<a href={this.state.post.url}>{this.state.post.url}</a>
					)}
				</div>

				<div className="individual-comments-section"></div>
			</div>
		);
	}

	generateCommentsList() {
		this.setState({
			comments: this.showComments(),
		});
	}

	parseDate(timestamp) {
		let date = timestamp.split("-");
		let day = date[2];
		day = day.split("T");
		let hour = day[1].split(".");

		let finalTime =
			date[1] + "-" + day[0] + "-" + date[0] + " at " + hour[0];
		return finalTime;
	}

	deleteComment(index) {
		let comment = encodeURIComponent(this.state.comments[index]._id);

		let commentPath =
			"http://localhost:4000/comments/get_comments/" + comment;

		axios.delete(commentPath, {}).then((response) => {
			this.setState({
				comments: this.state.comments.filter(
					(comments) => comments.body !== comment.body
				),
			});
		});
		document.location = "";
	}

	showComments() {
		return this.state.comments.map((comment, index) => {
			if (comment.title === this.state.post.title) {
				if (comment.username === sessionStorage.getItem("username")) {
					return (
						<div className="individual-db-comments-container">
							<div className="individual-db-comments">
								💬
								<span className="db-comment-index">➞</span>
								<span className="db-comment-body">
									{comment.body}
								</span>
								<div className="db-comment-information">
									<ul id="ul-comment">
										<small id="db-small-information">
											<li id="ul-comment-username">
												author:
												{" " + comment.username}
											</li>
											<li id="ul-comment-date">
												posted:
												{" " +
													this.parseDate(
														comment.date
													)}
											</li>
											<li id="ul-comment-delete">
												<a
													className="edit-comment-link"
													onClick={() =>
														this.deleteComment(
															index
														)
													}>
													delete
												</a>
											</li>
											<li id="ul-comment-edit">
												<a
													href={
														"./edit_post/" +
														this.state.comments[
															index
														]._id
													}
													className="edit-comment-link">
													edit
												</a>
											</li>
										</small>
									</ul>
								</div>
							</div>
						</div>
					);
				} else {
					return (
						<div className="individual-db-comments-container">
							<div className="individual-db-comments">
								💬
								<span className="db-comment-index">➞</span>
								<span className="db-comment-body">
									{comment.body}
								</span>
								<div className="db-comment-information">
									<ul id="ul-comment">
										<small id="db-small-information">
											<li id="ul-comment-username">
												author:
												{" " + comment.username}
											</li>
											<li id="ul-comment-date">
												posted:
												{" " +
													this.parseDate(
														comment.date
													)}
											</li>
										</small>
									</ul>
								</div>
							</div>
						</div>
					);
				}
			}
		});
	}

	componentDidMount() {
		this.getPosts();
		this.getComments();
	}

	getPosts() {
		let post_title = this.props.location.pathname.replace("/", "");

		post_title = encodeURIComponent(post_title.trim());

		axios
			.get("/posts/getPost/" + post_title)
			.then((response) => {
				const data = response.data;
				this.setState({ post: data });
			})
			.catch(() => {
				console.log("Error retrieving data!");
			});
	}

	getComments() {
		let post_title = this.props.location.pathname.replace("/", "");

		post_title = encodeURIComponent(post_title.trim());

		axios
			.get("/comments/get_comments")
			.then((response) => {
				let data = response.data;
				this.setState({ comments: data });
			})
			.catch(() => {
				console.log("Error retrieving comment data!");
			});
	}

	render() {
		return (
			<div className="outer-individual-post-container">
				<div className="list_of_posts">{this.showPosts()}</div>
				<div className="comments-section">{this.showComments()}</div>
			</div>
		);
	}
}
