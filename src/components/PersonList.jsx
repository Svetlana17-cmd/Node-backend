import React from 'react';
import styles from './PersonList.module.css';

const PersonList = ({ person, deletePerson }) => {
	return (
		<li>
			{person.name} - ({person.number})
			<button className={styles.button} onClick={() => deletePerson(person.id, person.name)}>
				X
			</button>
		</li>
	);
};

export default PersonList;
