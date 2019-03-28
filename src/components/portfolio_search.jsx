import React, { Component } from 'react';
import { SearchContext } from './context_search';

class PortfolioSearch extends Component {
	constructor(props) {
		super(props);

		this.state = {
			inputTagsValue: ""
		}
	}

	remove = (element) => {
		const array = this.props.context.state.tags;
		const index = array.indexOf(element);

		if (index !== -1) {
			array.splice(index, 1);
		}
	}

	separaVirgulas = (event) => {
		let str = event.target.value;
		console.log(event.target.value);
		this.setState({ inputTagsValue: str })
		if (str.indexOf(",") > 0) {
			str = str.replace(",", "");
			
			return str
		} else {
			return false
		}

	}

	render() {
		return (
			<SearchContext.Consumer>
				{context => (
					<div className="portfolio_search">
						<input type="search" />
						<input type="text" placeholder="#" value={this.state.inputTagsValue} onChange={e => {
							console.log('change context', context);
							this.setState({ inputTagsValue: e.target.value })
							if (this.separaVirgulas(e) !== false) {
								context.insertTag(this.separaVirgulas(e));
								this.setState({ inputTagsValue: "" });
							}
						}}
						/>
						{console.log("tags new", context.state.tags)}
						{context.state.tags.map((tag, index) => (
							<span key={index} onClick={evt => {
								console.log('clicking here', evt);
								console.log('with context', context)
								context.removeTag(tag)
							}}>{tag}</span>
						))
						}
					</div>
				)}
			</SearchContext.Consumer>
		);
	}
}

export default PortfolioSearch;