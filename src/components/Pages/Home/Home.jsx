import React, { useState,useEffect } from 'react'
import './Home.css'
import Cards from "../../Cards/Cards";
import axios from 'axios';

function Home({ searchQuery }) {

    const [popup, setPopup] = useState(false);
    const [details, setDetails] = useState({ title: "", description: "" });
    const [submitError, setSubmitError] = useState("");
    //const [newNotes, setNewNotes] = useState([]);

    const [notes, setNotes] = useState([]);
    useEffect(() => {
        fetchNotes();
    }, []);
    
    const handleClick = () => {
        setPopup(!popup);
    }

    const handleChange = (event) => {
        setDetails({ ...details, [event.target.name]: event.target.value });
    }

    async function postNote(note) {
        const response = await axios.post('http://localhost:5000/api/post', note);
        console.log("Note posted successfully:", response.data);
        await fetchNotes();
        return response.data;
    }



    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!details.title.trim() || !details.description.trim()) {
            setSubmitError("Title and description are required.");
            return;
        }

        setSubmitError("");
        console.log('details:', details);
        try {
            await postNote({
                title: details.title.trim(),
                description: details.description.trim(),
            });
            setDetails({ title: "", description: "" });
            setPopup(false);
        } catch (error) {
            console.error("Error posting note:", error);
            setSubmitError("Note could not be created. Check that the backend is running.");
        }
    }

        async function fetchNotes() {
            try{
               const result = await axios.get('http://localhost:5000/api/getnotes');
                console.log('Notes fetched successfully');
                setNotes(result.data);

            }
            catch(error){
                console.error('Error fetching notes:',error);
            }
        }


    const filteredNotes = notes.filter((note) => {
        const query = searchQuery.trim().toLowerCase();
        return !query
            || note.title.toLowerCase().includes(query)
            || note.description.toLowerCase().includes(query);
    });

    return (
        <div className='Homepage'>
            <header className='welcome'>
                <div>
                    <p className='eyebrow'>YOUR QUIET CORNER</p>
                    <h1>Thoughts, gathered.</h1>
                    <p className='welcome-copy'>Keep the small ideas worth coming back to.</p>
                </div>
                <div className='note-count'><strong>{filteredNotes.length}</strong><span>notes</span></div>
            </header>
            {popup && (
                <div className='Home-Overlay'>
                    <div className='Form'>
                        <form className='Note-Form' onSubmit={handleSubmit}>
                            <button type='button' className='close-btn' onClick={handleClick}>✕</button>
                            <input type="text" name="title" placeholder='Title' onChange={handleChange} value={details.title} />
                            <input type="text" name="description" placeholder='Description' onChange={handleChange} value={details.description} />
                            {submitError && <p role="alert">{submitError}</p>}
                            <button type='submit'>Submit</button>
                        </form>
                    </div>
                </div>
            )}
            <div className='compose-row'>
                <span className='section-label'>RECENT NOTES</span>
                <button className='but' onClick={handleClick}><span>+</span> New note</button>
            </div>
            <div className='cards'>
                {filteredNotes.length > 0 ? filteredNotes.map((note) => (
                    <Cards key={note.id} id={note.id} title={note.title} description={note.description} fetchNotes={fetchNotes} />
                )) : (
                    <div className='empty-state'>
                        <div className='empty-icon'>✦</div>
                        <h2>{searchQuery ? 'No matching notes' : 'A blank page is a beginning'}</h2>
                        <p>{searchQuery ? 'Try another search term.' : 'Capture an idea before it drifts away.'}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Home