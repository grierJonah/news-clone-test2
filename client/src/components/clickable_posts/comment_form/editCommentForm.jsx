import axios from "axios";
import React from "react";
import "./editCommentForm.css";

export default class edit_comment_form extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: "",
			body: "",
			username: "",
			old_title: "",
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
			const id = this.props.match.params.individualComment;

			axios.get("/comments/get_comments/" + id).then((response) => {
				this.setState({
					old_title: response.data.title,
					body: this.state.body,
					username: sessionStorage.getItem("username"),
				});
			});

			const new_comment = {
				title: this.state.old_title,
				body: this.state.body,
				username: sessionStorage.getItem("username"),
			};
			console.log("New Comment:", new_comment.body);
			axios
				.put("/comments/edit_comment/" + id, new_comment)
				.then((res) => console.log("Finished editing!"));

			document.location = "../";
		} else {
			document.location = "../authenticate";
		}
	}

	render() {
		return (
			<div>
				<div className="edit-comment-container">
					<div className="form-group">
						<form
							className="edit-comment-form"
							onSubmit={this.sendToDatabase.bind(this)}>
							<div className="mb-1">
								<textarea
									className="form-control"
									rows={3}
									cols={50}
									onChange={this.changeBody}
									value={this.state.body}
									id="postBody"
									required={true}
									placeholder="Update Comment"
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
								<a href="../" onClick={this.addCommentFunc}>
									Cancel
								</a>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}
