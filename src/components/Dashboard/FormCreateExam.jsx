import React, { useContext, useState } from 'react'
import { UserContext } from '../../services/UserContext';

const FormCreate = () => { 
    const { createExam } = useContext(UserContext)

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        nivel: '',
        date: '',
        duration: '',
        teacher: '',
        questions: []
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const addQuestion = () => {
        setFormData(prev => ({
            ...prev,
            questions: [...prev.questions, { question: '', options: [''], correctAnswer: '' }]
        }));
    };

    const updateQuestionText = (index, text) => {
        const newQuestions = [...formData.questions];
        newQuestions[index].question = text;
        setFormData(prev => ({ ...prev, questions: newQuestions }));
    };

    const addOption = (questionIndex) => {
        const newQuestions = [...formData.questions];
        newQuestions[questionIndex].options.push('');
        setFormData(prev => ({ ...prev, questions: newQuestions }));
    };

    const updateOptionText = (questionIndex, optionIndex, text) => {
        const newQuestions = [...formData.questions];
        newQuestions[questionIndex].options[optionIndex] = text;
        setFormData(prev => ({ ...prev, questions: newQuestions }));
    }

    const removeOption = (questionIndex, optionIndex) => {
        const newQuestions = [...formData.questions];
        newQuestions[questionIndex].options.splice(optionIndex, 1);
        setFormData(prev => ({ ...prev, questions: newQuestions }));
    };

    const removeQuestion = (questionIndex) => {
        const newQuestions = [...formData.questions];
        newQuestions.splice(questionIndex, 1);
        setFormData(prev => ({ ...prev, questions: newQuestions }));
    };

    const setCorrectAnswer = (questionIndex, answer) => {
        const newQuestions = [...formData.questions];
        newQuestions[questionIndex].correctAnswer = answer;
        setFormData(prev => ({ ...prev, questions: newQuestions }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Datos del formulario que se envían:", formData);
            // Convertir duration a número
            const examData = {
                ...formData,
                duration: parseInt(formData.duration, 10),
                date: new Date(formData.date).toISOString()
            };
            await createExam(examData);
            // Limpiar el formulario o redirigir después de crear el examen
        } catch (error) {
            if (error.response) {
                console.error("Error del servidor:", error.response.data.message);
                // Mostrar el mensaje de error al usuario
            } else {
                console.error("Error al crear el examen:", error);
            }
        }
    };

    return (
        <form className="bg-gray-50 w-[820px] flex flex-col rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
            <Data placeholder={'Enter title'} text={'Title'} name="title" value={formData.title} onChange={handleInputChange} />
            <Data placeholder={'Enter description'} text={'Description'} name="description" value={formData.description} onChange={handleInputChange} />
            <Data placeholder={'Enter level'} text={'Level'} name="nivel" value={formData.nivel} onChange={handleInputChange} />
            <Data placeholder={'Enter date'} text={'Date'} name="date" value={formData.date} onChange={handleInputChange} />
            <Data placeholder={'Enter duration'} text={'Duration'} name="duration" value={formData.duration} onChange={handleInputChange} />
            <Data placeholder={'Enter teacher'} text={'Teacher'} name="teacher" value={formData.teacher} onChange={handleInputChange} />

            <div className="flex flex-col mb-3">
                <label className="text-xl font-semibold text-gray-700">Questions:</label>
                {formData.questions.map((question, questionIndex) => (
                    <div key={questionIndex} className="mb-4">
                        <input
                            type="text"
                            value={question.question}
                            onChange={(e) => updateQuestionText(questionIndex, e.target.value)}
                            className='border-b-2 border-gray-300 focus:outline-none rounded-md bg-inherit px-3 py-1 w-full mb-2'
                            placeholder="Enter question"
                        />

                        <button
                            type="button"
                            onClick={() => removeQuestion(questionIndex)}
                            className='bg-red-500 text-[11px] text-white px-2 py-1 rounded ml-2'>
                            Delete Question
                        </button>

                        {question.options.map((option, optionIndex) => (
                            <div key={optionIndex} className="items-center mb-2">
                                <input
                                    type="text"
                                    value={option}
                                    onChange={(e) => updateOptionText(questionIndex, optionIndex, e.target.value)}
                                    className="border-b-2 border-gray-300 focus:outline-none rounded-md bg-inherit px-3 py-1 w-full mb-2"
                                    placeholder={`Option ${optionIndex + 1}`}
                                />

                                <input
                                    type="radio"
                                    name={`correctAnswer-${questionIndex}`}
                                    checked={question.correctAnswer === optionIndex}
                                    onChange={() => setCorrectAnswer(questionIndex, optionIndex)}
                                    className="ml-2"
                                    placeholder="Correct Answer"
                                /> 

                                <button
                                    type="button"
                                    onClick={() => removeOption(questionIndex, optionIndex)}
                                    className="bg-red-500 text-[11px] text-white px-2 py-1 rounded ml-2"
                                >
                                    Delete Option
                                </button>
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={() => addOption(questionIndex)}
                            className='bg-blue-500 text-[11px] text-white px-2 py-1 rounded mx-2'>
                            Add Option
                        </button>
                    </div>
                ))}
            </div>

            <div className='flex justify-between'>
                <button type='submit' onClick={handleSubmit} className='m-6 bg-[#3a868f] text-white w-[200px] p-2 rounded-2xl'>
                    Create Exam
                </button>
                <button
                    type="button"
                    onClick={addQuestion}
                    className='m-6 bg-[#3a868f] text-white w-[200px] p-2 rounded-2xl'
                >
                    Add new question
                </button>
            </div>
        </form>
    );
};

const Data = ({ text, placeholder, name, value, onChange }) => (
    <div className="flex flex-col mb-3">
        <label className="text-xl font-semibold text-gray-700">{text}</label>
        <input
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            type="text"
            className='border-b-2 border-gray-300 focus:outline-none rounded-md bg-inherit px-3 py-1'
        />

    </div>
);

export default FormCreate