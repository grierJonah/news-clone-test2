import React from "react";
import axios from "axios";

export default class post_url_form extends React.Component {
	constructor() {
		super();
		this.state = {
			title: "",
			url: "",
			username: "",
		};
		this.changeTitle = this.changeTitle.bind(this);
		this.changeURL = this.changeURL.bind(this);
	}

	changeTitle(event) {
		this.setState({
			title: event.target.value,
		});
	}

	changeURL(event) {
		this.setState({
			url: event.target.value,
		});
	}

	sanitizeTitle(title) {
		return title.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");
	}

	sendToDatabase(event) {
		event.preventDefault();

		if (sessionStorage.getItem("cookie")) {
			const newBlogPost = {
				title: this.sanitizeTitle(this.state.title),
				url: this.state.url,
				body: "",
				username: sessionStorage.getItem("username"),
			};

			axios
				.post("http://localhost:4000/posts/add_url_post", newBlogPost)
				.then((response) => console.log("Response:", response.data));

			document.location = "/" + newBlogPost.title;
			this.setState({
				title: "",
				url: "",
				username: "",
			});
		} else {
			document.location = "../authenticate";
		}
	}

	render() {
		return (
			<div className="url-container">
				<div className="form-group">
					<label className="col-xs-3 col-form-label mr-2">
						Post Title:
					</label>
					<div className="col-xs-9">
						<input
							type="text"
							placeholder="Enter your Posts title"
							className="form-control"
							onChange={this.changeTitle}
							value={this.state.title}
							id="title"
							name="title"
							required={true}
						/>
					</div>
				</div>
				<div className="form-group">
					<label
						htmlFor="URL"
						className="col-xs-3 col-form-label mr-2">
						URL:
					</label>
					<div className="col-xs-9">
						<input
							type="text"
							placeholder="Link to article"
							className="form-control"
							onChange={this.changeURL}
							value={this.state.url}
							id="url"
							name="url"
							required={true}
						/>
					</div>
				</div>
				<form onSubmit={this.sendToDatabase.bind(this)}>
					<div className="form-group">
						<div>
							<button
								type="submit"
								className="btn btn-success"
								id="post-url-submit">
								Submit
							</button>
							<div id="post-back-button">
								<a href="../">Cancel</a>
							</div>
						</div>
					</div>
				</form>
			</div>
		);
	}
}
