import React from "react";
import axios from "axios";
import "./edit_post.css";

export default class edit_post_body_form extends React.Component {
	constructor() {
		super();
		this.state = {
			title: "",
			body: "",
			username: "",
			id: "",
			old_title: "",
			old_body: "",
		};
		this.changeTitle = this.changeTitle.bind(this);
		this.changeBody = this.changeBody.bind(this);
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

	sendToDatabase(event) {
		event.preventDefault();

		if (sessionStorage.getItem("cookie")) {
			const post_title = encodeURIComponent(this.props.match.params.Post);

			axios
				.get("http://localhost:4000/posts/getPost/" + post_title)
				.then((response) => {
					const new_post = {
						id: response.data._id,
						title: this.state.title,
						body: this.state.body,
						username: sessionStorage.getItem("username"),
					};
					axios
						.put(
							"http://localhost:4000/posts/edit_body_post/" +
								post_title,
							new_post
						)
						.then((res) =>
							console.log("Finished editing post", res)
						);

					document.location = "/";
				});
		} else {
			document.location = "../authenticate";
		}
	}

	render() {
		return (
			<div className="edit-form-container">
				<div className="form-group">
					<form onSubmit={this.sendToDatabase.bind(this)}>
						<div className="form-group">
							<label className="col-xs-3 col-form-label mr-2">
								Post Title:
							</label>
							<div className="col-xs-9">
								<input
									className="form-control"
									type="text"
									placeholder="Posts Title"
									onChange={this.changeTitle}
									value={this.state.title}
									required={true}
								/>
							</div>
						</div>
						<div className="mb-3">
							<label htmlFor="postBody" className="form-label">
								Body:
							</label>
							<textarea
								className="form-control"
								rows={5}
								cols={80}
								onChange={this.changeBody}
								value={this.state.body}
								id="postBody"
								required={true}
							/>
						</div>
						<div className="form-group" id="register-outer-button">
							<input
								type="submit"
								className="btn btn-success"
								value="Submit"
							/>
						</div>
						<div id="post-back-button">
							<a href="../">Cancel</a>
						</div>
					</form>
				</div>
			</div>
		);
	}
}
