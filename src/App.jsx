import React, { useState, useEffect } from 'react';
import FilterForm from './components/FilterForm';
import AddPersonForm from './components/AddPersonForm';
import PersonList from './components/PersonList';
import personService from './services/persons';
import styles from './App.module.css';

const App = () => {

	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');
	const [searchName, setSearchName] = useState('');
	const [persons, setPersons] = useState([]);
	const [filteredPersons, setFilteredPersons] = useState([]);
	const [error, setError] = useState('')
	const [message, setMessage] = useState('');

	const showMessage = (msg) => {
		setMessage(msg);
		setTimeout(() => {
			setMessage('');
		}, 5000);
	};


	useEffect(() => {
		console.log('effect')
		personService
			.getAll()
			.then(response => {
				setPersons(response.data);
				setFilteredPersons(response.data);
			})
			.catch(error => {
				console.error('Error fetching persons:', error);
				setError('Error fetching persons');
				setTimeout(() => {
					setError('');
				 }, 5000);
			});
	}, [])
	
	useEffect(() => {
    		const updatedFilteredPersons =
      		searchName === ''
        	? persons
        	: persons.filter((person) =>
           	 person.name.toLowerCase().includes(searchName.toLowerCase()),
          	);
    	setFilteredPersons(updatedFilteredPersons || []);
  	}, [searchName, persons]);
	
	const addPerson = (event) => {
		event.preventDefault();
		setError('')
		const personObject = {
			name: name,
			number: phone,
		};
		const nameExists = 
			Array.isArray(persons) && persons.some(person => person.name === newName);
		if (nameExists) {
			setError(`The person ${name} is already added to Phone book`);
			setName('');
			setPhone('');
			setTimeout(() => {
				setError('');
			}, 5000);
		} else {
			personService
				.create(personObject)
				.then(response => {
					const updatedPersons = persons.concat(response.data);
					setPersons(updatedPersons);
					setFilteredPersons(updatedPersons);
					setName('');
					setPhone('');
					showMessage(`Added ${name}`);
				})
				.catch(error => {
					console.error('There was an error adding the person!', error);
					setError('There was an error adding the person!');
					setTimeout(() => {
						setError('');
					}, 5000);
				});

		}
	};
	const handleSearchChange = (event) => {
		setSearchName(event.target.value.toLowerCase());
	};

	const deletePerson = (id, person) => {
		setError(`Deleting ${person}...`);
		personService
			.delete(id)
			.then(() => {
				const updatedPersons = persons.filter(person => person.id !== id);
				setPersons(updatedPersons);
				setFilteredPersons(updatedPersons);
				setError('');
				showMessage(`Deleted ${person}`);
			})
			.catch(error => {
				setError('There was an error deleting the person!');
				console.error('There was an error deleting the person!', error);
				setTimeout(() => {
					setError('');
				}, 5000);
			});
	};

	const handleNameChange = (event) => {
		setNewName(event.target.value)
	}
	const handleNumberChange = (event) => {
		setPhone(event.target.value)
	}

	return (
		<div>
			<h1 style={{ color: 'black', fontSize: 40, marginBottom: "20 px" }}>Phone book</h1>
			{error && <div id="error-message" className={styles.error}>{error}</div>}
			{message && <div id="success-message" className={styles.success}>{message}</div>}
			<FilterForm searchName={searchName} handleSearchChange={handleSearchChange} />
			<h2 style={{ color: 'black', fontSize: 30, marginBottom: "20 px" }}>Add a new</h2>
			<AddPersonForm
				addPerson={addPerson}
				handleNameChange={handleNameChange}
				handleNumberChange={handleNumberChange}
				newName={name}
				phone={phone}
			/>
			<h2 style={{ color: 'black', fontSize: 30, marginBottom: "20 px" }}>Numbers</h2>
			<ul>
				{Array.isArray(filteredPersons) &&
					filteredPersons && filteredPersons.map(person => (
					<PersonList
						key={person.id}
						person={person}
						deletePerson={deletePerson}
					/>
				))}
			</ul>
		</div>
	)
};
export default App;
