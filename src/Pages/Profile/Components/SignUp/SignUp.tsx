import Input from '../../../../Components/Input/Index'
import { ButtonTypes } from '../../../../Components/Button/ButtonTypes'
import Button from '../../../../Components/Button/Button'
import style from '../ProfileForm/ProfileForm.module.css'
import img from '../../../../Assets/gerti.jpg'
import AxiosInstance from '../../../../Helpers/Axios'
import { useState } from 'react'

interface User {
    email: string
    lastName: string
    phone: string
    pob: string
    dob: string
    gender: string
    role: string
    firstName: string
    [key: string]: string
}

const SignUp = () => {
    const [user, setUser] = useState<User>({
        email: '',
        lastName: '',
        phone: '',
        firstName: '',
        gender: '',
        pob: '',
        dob: '',
        role: 'dev',
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        const { name, value } = event.target
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }))
    }

    const handleSignUp = (event: React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault()

        AxiosInstance.post('/auth/signup', user)
            .then(() => {
                console.log('User created successfully')
            })
            .catch((error) => {
                console.error('Error updating user:', error)
            })
    }

    return (
        <div className={style.container}>
            <div className={style.profile}>
                <img src={img} style={{ width: '94px', height: '94px', borderRadius: '50%', objectFit: 'cover' }} alt="Profile" />
                <div>
                    <div className={style.name}>Elisabeta Guri</div>
                    <div className={style.position}>
                        Head of Human Resources
                    </div>
                    <div className={style.hr}>HR Department</div>
                </div>
            </div>
            <div className={style.border}></div>
            <div className={style.title}>Personal Information</div>

            <div className={style.forms}>
                <div className={style.inputWidth}>
                    <Input
                        IsUsername
                        label="firstName"
                        name="firstName"
                        onChange={handleChange}
                        value={user.firstName}
                    />
                </div>
                <div className={style.inputWidth}>
                    <Input
                        IsUsername
                        label="lastName"
                        name="lastName"
                        onChange={handleChange}
                        value={user.lastName}
                    />
                </div>
            </div>

            <div className={style.forms}>
                <div className={style.inputWidth}>
                    <Input
                        IsUsername
                        type="email"
                        label="Email"
                        name="email"
                        onChange={handleChange}
                        value={user.email}
                    />
                </div>
                <div className={style.inputWidth}>
                    <Input
                        IsUsername
                        name="phone"
                        label="PhoneNumber"
                        onChange={handleChange}
                        value={user.phone}
                    />
                </div>
            </div>

            <div className={style.forms}>
                <div className={style.inputWidth}>
                    <Input
                        IsUsername
                        label="BirthDate"
                        name="dob"
                        onChange={handleChange}
                        value={user.dob}
                    />
                </div>
                <div className={style.inputWidth}>
                    <Input
                        IsUsername
                        label="CountryOfBirth"
                        name="pob"
                        onChange={handleChange}
                        value={user.pob}
                    />
                </div>
            </div>

            <div className={style.forms}>
                <div className={style.inputWidth}>
                    <Input
                        IsUsername
                        label="Gender"
                        name="gender"
                        onChange={handleChange}
                        value={user.gender}
                    />
                </div>
            </div>

            <div className={style.checkboxDiv}>
                <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 cursor-pointer accent-blue-600" />
                    <span className="text-base font-medium text-slate-700">Public Holidays</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 cursor-pointer accent-blue-600" />
                    <span className="text-base font-medium text-slate-700">Remote</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 cursor-pointer accent-blue-600" />
                    <span className="text-base font-medium text-slate-700">External</span>
                </label>
            </div>
            <div className={style.border}></div>
            <div className={style.inputWidth}>
                <Button
                    onClick={handleSignUp}
                    type={ButtonTypes.PRIMARY}
                    btnText="Save Changes"
                />
            </div>
        </div>
    )
}

export default SignUp
