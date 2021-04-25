import "./post.css";
import PostUrlForm from "./url_form/post_url_form";
import PostBodyForm from "./body_form/post_body_form";
import React from "react";

class Post extends React.Component {
	constructor() {
		super();
		this.state = {
			postType: "",
		};
		this.handlePostType = this.handlePostType.bind(this);
	}

	handlePostType(type) {
		this.setState({
			postType: type.target.value,
		});
	}

	render() {
		let renderForm;
		if (this.state.postType === "body") {
			renderForm = <PostBodyForm />;
		} else if (this.state.postType === "url") {
			renderForm = <PostUrlForm />;
		}

		return (
			<div className="post-container">
				<select
					className="form-select form-select-lg mb-3"
					aria-label=".form-select-lg example"
					onChange={this.handlePostType}
					defaultValue="default">
					<option value="default">Choose Post Type</option>
					<option value="url">URL</option>
					<option value="body">Body</option>
				</select>
				{renderForm}
			</div>
		);
	}
}

export default Post;
