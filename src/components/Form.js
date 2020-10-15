import React from 'react'

export default function Form(props) {
    const { values, change, submit, disabled,  errors } = props;
    const onChange = evt => {
        evt.target.type === 'checkbox' ? change(evt.target.name, evt.target.checked) : change(evt.target.name, evt.target.value)
    }
    const onSubmit = evt => {
        evt.preventDefault()
        submit();
    }
    return (
        <div>
            <div>
                <p>{errors.name}</p>
                <p>{errors.email}</p>
                <p>{errors.password}</p>
                <p>{errors.tos}</p>
            </div>
            <form onSubmit={onSubmit}>
            <div>    
            <label>
                Name:
                <input
                    name="name"
                    type="text"
                    value={values.name}
                    onChange={onChange}
                />
            </label>
            </div>
            <div>
            <label>
                Email:
                <input
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={onChange}
                />
            </label>
            </div>
            <div>
            <label>
                Password:
                <input
                    name="password"
                    type="text"
                    value={values.password}
                    onChange={onChange}
                />
            </label>
            </div>
            <div>
            <label>
                Role:
                <select
                    name="role"
                    value={values.role}
                    onChange={onChange}
                >
                    <option value=''>---Select A Role---</option>
                    <option value='student'>Student</option>
                    <option value='teacher'>Teacher</option>
                    <option value='Team Lead'>Team Lead</option>
                </select>
            </label>
            </div>
            <div>
            <label>
                Terms of Service:
                <input
                    name="tos"
                    type="checkbox"
                    checked={values.tos}
                    onChange={onChange}
                />
            </label>
            </div>
            <div>
            <button disabled={disabled}>Submit</button>
            </div>
        </form>
            
        </div>
    )
}
