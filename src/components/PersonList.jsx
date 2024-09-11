import React from 'react';

const PersonList = ({ person }) => {

	return (

		<li>
			{person.name} - ({person.number})
		</li>)
};

export default PersonList;