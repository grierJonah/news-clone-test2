import React from "react";
import axios from "axios";
import "./addCommentForm.css";

export default class post_comment_form extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: "",
			body: "",
			username: "",
			isActive: false,
		};
		this.changeTitle = this.changeTitle.bind(this);
		this.changeBody = this.changeBody.bind(this);
		this.addCommentFunc = this.addCommentFunc.bind(this);
	}

	changeTitle(event) {
		this.setState({
			title: event.target.value,
		});
	}

	changeBody(event) {
		this.setState({
			body: event.target.value,
		});
	}

	sanitizeTitle(title) {
		return title.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");
	}

	addCommentFunc() {
		this.setState({
			isActive: !this.state.isActive,
		});
	}

	sendToDatabase(event) {
		event.preventDefault();

		if (sessionStorage.getItem("cookie")) {
			const newComment = {
				title: this.props.blog_title,
				body: this.state.body,
				username: sessionStorage.getItem("username"),
			};

			axios.post("/comments/add_comment", newComment).then((response) => {
				console.log(response);
			});

			document.location = "/" + this.props.blog_title;
			this.setState({
				title: "",
				body: "",
				username: "",
			});
		} else {
			document.location = "../authenticate";
		}
	}

	render() {
		return (
			<div>
				{this.state.isActive ? (
					<div className="form-group">
						<form onSubmit={this.sendToDatabase.bind(this)}>
							<div className="mb-1">
								<textarea
									className="form-control"
									rows={3}
									cols={50}
									onChange={this.changeBody}
									value={this.state.body}
									id="postBody"
									required={true}
									placeholder="Add Comment"
								/>
							</div>
							<div
								className="form-group"
								id="register-outer-button">
								<input
									type="submit"
									className="btn btn-success"
									value="Submit"
								/>
							</div>
							<div id="post-back-button">
								<a
									href="javascript:void(0);"
									onClick={this.addCommentFunc}>
									Cancel
								</a>
							</div>
						</form>
					</div>
				) : null}
				<div id="add-comment-button">
					{this.state.isActive ? null : (
						<button onClick={this.addCommentFunc}>
							Add Comment
						</button>
					)}
				</div>
			</div>
		);
	}
}
