import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import legoLogo from '../png/Lego-logo.png';
import legoBusinessMan from '../png/legoBusinessMan.png';
import { BsFacebook, BsApple } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';

export default function Register() {
    const [email, setEmail] = useState(null); 
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [country, setCountry] = useState("United States of America"); 

    // Form
    const [form, setForm] = useState({
        emailValid: null,
        passwordValid: null,
        confirmPasswordValid: null,
    });

    // Error
    const [error, setError] = useState({
        emailError: '',
        passwordError: '',
        confirmPasswordError: '',
    });

    // Valid forms
    const [isValidUser, setIsValidUser] = useState(false); 

    useEffect(() => { 
        const isEmail = (email) => {
            return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
        }

        const validateUser = () => {
            if (email === 'server error') {
                setError(prevError => ({
                    ...prevError,
                    emailError: 'Email already exists',
                }));
                setForm(prevForm => ({
                    ...prevForm,
                    emailValid: false,
                }));
            } else if (email === null) {
                setError(prevError => ({
                    ...prevError,
                    emailError: '',
                }));
                setForm(prevForm => ({
                    ...prevForm,
                    emailValid: null,
                }));
            } else if (email === '') {
                setError(prevError => ({
                    ...prevError,
                    emailError: 'Email is required',
                }));
                setForm(prevForm => ({
                    ...prevForm,
                    emailValid: false,
                }));
            } else if (!isEmail(email)) {
                setError(prevError => ({
                    ...prevError,
                    emailError: 'Email is not valid',
                }));
                setForm(prevForm => ({
                    ...prevForm,
                    emailValid: false,
                }));
            } else {
                setError(prevError => ({
                    ...prevError,
                    emailError: '',
                }));
                setForm(prevForm => ({
                    ...prevForm,
                    emailValid: true,
                }));
            }

            if (password === null) {
                setError(prevError => ({
                    ...prevError,
                    passwordError: '',
                }));
                setForm(prevForm => ({
                    ...prevForm,
                    passwordValid: null,
                }));
            } else if (password === '') {
                setError(prevError => ({
                    ...prevError,
                    passwordError: 'Password is required',
                }));
                setForm(prevForm => ({
                    ...prevForm,
                    passwordValid: false,
                }));
            } else if (password.length < 10) {
                setError(prevError => ({
                    ...prevError,
                    passwordError: 'Password is too short',
                }));
                setForm(prevForm => ({
                    ...prevForm,
                    passwordValid: false,
                }));
            } else {
                setError(prevError => ({
                    ...prevError,
                    passwordError: '',
                }));
                setForm(prevForm => ({
                    ...prevForm,
                    passwordValid: true,
                }));
            }

            if (confirmPassword === null) {
                setError(prevError => ({
                    ...prevError,
                    confirmPasswordError: '',
                }));
                setForm(prevForm => ({
                    ...prevForm,
                    confirmPasswordValid: null,
                }));
            } else if (confirmPassword === '') {
                setError(prevError => ({
                    ...prevError,
                    confirmPasswordError: 'Passwords do not match',
                }));
                setForm(prevForm => ({
                    ...prevForm,
                    confirmPasswordValid: false,
                }));
            } else if (confirmPassword !== password) {
                setError(prevError => ({
                    ...prevError,
                    confirmPasswordError: 'Passwords do not match',
                }));
                setForm(prevForm => ({
                    ...prevForm,
                    confirmPasswordValid: false,
                }));
            } else {
                setError(prevError => ({
                    ...prevError,
                    confirmPasswordError: '',
                }));
                setForm(prevForm => ({
                    ...prevForm,
                    confirmPasswordValid: true,
                }));
            }

            if (form.emailValid === true && form.passwordValid === true && form.confirmPasswordValid === true) {
                setIsValidUser(true);
            } else {
                setIsValidUser(false);
            }
        }

        validateUser();
    }, [form.emailValid, form.passwordValid, form.confirmPasswordValid, error.emailError, error.passwordError, error.confirmPasswordError, email, password, confirmPassword, isValidUser]);

    const registerUser = async (e) => {
        e.preventDefault();
        if (isValidUser) {
            try {
                const user = {
                    email,
                    password,
                    country,
                }
    
                const response = await fetch('http://localhost:3001/api/user/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json', 
                    },
                    body: JSON.stringify(user),
                });
                
                const data = await response.json(); 

                // Handle server side errors 
                if (data.error) {
                    setEmail('server error'); 
                }

            } catch(err) {
                console.log(err);
            }
        }
    }

    return (
        <>
            <AccountHeader />
            <div className='xxs:bg-gray-100 xxs:px-4'>
                <div className='xxs:mt-14'>
                    <h1 className='xxs:text-xl xxs:text-center xxs:px-4 xxs:py-4'>Create your adult LEGO Account</h1>
                    <div className='xxs:w-full xxs:flex xxs:flex-col xxs:items-center xxs:mt-4'>
                        <span className='xxs:text-sm' >Already have an account?</span>
                        <Link className='xxs:text-sm xxs:text-blue-500 xxs:font-semibold' to='/login'>Log in</Link>
                    </div>
                    <div className='xxs:w-full xxs:flex xxs:flex-col xxs:items-center'>
                        <SocialMediaAccounts />
                        <small className='xxs:py-2 xxs:mt-4 xxs:mb-2 xxs:font-medium'>Or use your email</small>
                        <img className='xxs:h-40 xxs:w-auto' src={legoBusinessMan} alt="" />
                    </div>
                    <form className='xxs:mt-4 xxs:flex xxs:flex-col xxs:items-center' onSubmit={registerUser}>
                        <label className='xxs:text-sm xxs:mt-4 xxs:mb-2 block xxs:font-light xxs:w-full' htmlFor="email">Email address</label>
                        <input 
                            className={form.emailValid ? 'input-field xxs:border-green-500' : form.emailValid === null ? 'input-field xxs:border-gray-300' : 'input-field xxs:border-red-600'}
                            type="email" 
                            id='email' 
                            name='email' 
                            placeholder="example@domain.com" 
                            onBlur={(e) => setEmail(e.target.value)}
                        />
                        <small className='xxs:w-full xxs:text-left xxs:mt-1 xxs:text-red-600'>{error.emailError}</small>
                        <label className='xxs:text-sm xxs:mt-4 xxs:mb-2 block xxs:font-light xxs:w-full' htmlFor="password">Password</label>
                        <input 
                            className={form.passwordValid ? 'input-field xxs:border-green-500' : form.passwordValid === null ? 'input-field xxs:border-gray-300' : 'input-field xxs:border-red-600'}
                            type="password" 
                            id='password' 
                            name='password' 
                            placeholder="********" 
                            onBlur={(e) => setPassword(e.target.value)}
                        />
                        <small className='xxs:w-full xxs:text-left xxs:mt-1 xxs:text-red-600'>{error.passwordError}</small>
                        <label className='xxs:text-sm xxs:mt-4 xxs:mb-2 block xxs:font-light xxs:w-full' htmlFor="password">Confirm password</label>
                        <input 
                            className={form.confirmPasswordValid ? 'input-field xxs:border-green-500' : form.confirmPasswordValid === null ? 'input-field xxs:border-gray-300' : 'input-field xxs:border-red-600'}
                            type="password" 
                            id='password' 
                            name='password' 
                            placeholder="********" 
                            onBlur={(e) => setConfirmPassword(e.target.value)}
                        />
                        <small className='xxs:w-full xxs:text-left xxs:mt-1 xxs:text-red-600'>{error.confirmPasswordError}</small>
                        <label className='xxs:text-sm xxs:mt-4 xxs:mb-2 block xxs:font-light xxs:w-full' htmlFor="country">Country</label>
                        <select className='input-field xxs:bg-white xxs:text-sm xxs:font-light xxs:border-gray-300' value={country} onChange={(e) => setCountry(e.target.value)} id="country" name="country" >
                            <option value="Afganistan">Afghanistan</option>
                            <option value="Albania">Albania</option>
                            <option value="Algeria">Algeria</option>
                            <option value="American Samoa">American Samoa</option>
                            <option value="Andorra">Andorra</option>
                            <option value="Angola">Angola</option>
                            <option value="Anguilla">Anguilla</option>
                            <option value="Antigua & Barbuda">Antigua & Barbuda</option>
                            <option value="Argentina">Argentina</option>
                            <option value="Armenia">Armenia</option>
                            <option value="Aruba">Aruba</option>
                            <option value="Australia">Australia</option>
                            <option value="Austria">Austria</option>
                            <option value="Azerbaijan">Azerbaijan</option>
                            <option value="Bahamas">Bahamas</option>
                            <option value="Bahrain">Bahrain</option>
                            <option value="Bangladesh">Bangladesh</option>
                            <option value="Barbados">Barbados</option>
                            <option value="Belarus">Belarus</option>
                            <option value="Belgium">Belgium</option>
                            <option value="Belize">Belize</option>
                            <option value="Benin">Benin</option>
                            <option value="Bermuda">Bermuda</option>
                            <option value="Bhutan">Bhutan</option>
                            <option value="Bolivia">Bolivia</option>
                            <option value="Bonaire">Bonaire</option>
                            <option value="Bosnia & Herzegovina">Bosnia & Herzegovina</option>
                            <option value="Botswana">Botswana</option>
                            <option value="Brazil">Brazil</option>
                            <option value="British Indian Ocean Ter">British Indian Ocean Ter</option>
                            <option value="Brunei">Brunei</option>
                            <option value="Bulgaria">Bulgaria</option>
                            <option value="Burkina Faso">Burkina Faso</option>
                            <option value="Burundi">Burundi</option>
                            <option value="Cambodia">Cambodia</option>
                            <option value="Cameroon">Cameroon</option>
                            <option value="Canada">Canada</option>
                            <option value="Canary Islands">Canary Islands</option>
                            <option value="Cape Verde">Cape Verde</option>
                            <option value="Cayman Islands">Cayman Islands</option>
                            <option value="Central African Republic">Central African Republic</option>
                            <option value="Chad">Chad</option>
                            <option value="Channel Islands">Channel Islands</option>
                            <option value="Chile">Chile</option>
                            <option value="China">China</option>
                            <option value="Christmas Island">Christmas Island</option>
                            <option value="Cocos Island">Cocos Island</option>
                            <option value="Colombia">Colombia</option>
                            <option value="Comoros">Comoros</option>
                            <option value="Congo">Congo</option>
                            <option value="Cook Islands">Cook Islands</option>
                            <option value="Costa Rica">Costa Rica</option>
                            <option value="Cote DIvoire">Cote DIvoire</option>
                            <option value="Croatia">Croatia</option>
                            <option value="Cuba">Cuba</option>
                            <option value="Curaco">Curacao</option>
                            <option value="Cyprus">Cyprus</option>
                            <option value="Czech Republic">Czech Republic</option>
                            <option value="Denmark">Denmark</option>
                            <option value="Djibouti">Djibouti</option>
                            <option value="Dominica">Dominica</option>
                            <option value="Dominican Republic">Dominican Republic</option>
                            <option value="East Timor">East Timor</option>
                            <option value="Ecuador">Ecuador</option>
                            <option value="Egypt">Egypt</option>
                            <option value="El Salvador">El Salvador</option>
                            <option value="Equatorial Guinea">Equatorial Guinea</option>
                            <option value="Eritrea">Eritrea</option>
                            <option value="Estonia">Estonia</option>
                            <option value="Ethiopia">Ethiopia</option>
                            <option value="Falkland Islands">Falkland Islands</option>
                            <option value="Faroe Islands">Faroe Islands</option>
                            <option value="Fiji">Fiji</option>
                            <option value="Finland">Finland</option>
                            <option value="France">France</option>
                            <option value="French Guiana">French Guiana</option>
                            <option value="French Polynesia">French Polynesia</option>
                            <option value="French Southern Ter">French Southern Ter</option>
                            <option value="Gabon">Gabon</option>
                            <option value="Gambia">Gambia</option>
                            <option value="Georgia">Georgia</option>
                            <option value="Germany">Germany</option>
                            <option value="Ghana">Ghana</option>
                            <option value="Gibraltar">Gibraltar</option>
                            <option value="Great Britain">Great Britain</option>
                            <option value="Greece">Greece</option>
                            <option value="Greenland">Greenland</option>
                            <option value="Grenada">Grenada</option>
                            <option value="Guadeloupe">Guadeloupe</option>
                            <option value="Guam">Guam</option>
                            <option value="Guatemala">Guatemala</option>
                            <option value="Guinea">Guinea</option>
                            <option value="Guyana">Guyana</option>
                            <option value="Haiti">Haiti</option>
                            <option value="Hawaii">Hawaii</option>
                            <option value="Honduras">Honduras</option>
                            <option value="Hong Kong">Hong Kong</option>
                            <option value="Hungary">Hungary</option>
                            <option value="Iceland">Iceland</option>
                            <option value="Indonesia">Indonesia</option>
                            <option value="India">India</option>
                            <option value="Iran">Iran</option>
                            <option value="Iraq">Iraq</option>
                            <option value="Ireland">Ireland</option>
                            <option value="Isle of Man">Isle of Man</option>
                            <option value="Israel">Israel</option>
                            <option value="Italy">Italy</option>
                            <option value="Jamaica">Jamaica</option>
                            <option value="Japan">Japan</option>
                            <option value="Jordan">Jordan</option>
                            <option value="Kazakhstan">Kazakhstan</option>
                            <option value="Kenya">Kenya</option>
                            <option value="Kiribati">Kiribati</option>
                            <option value="Korea North">Korea North</option>
                            <option value="Korea Sout">Korea South</option>
                            <option value="Kuwait">Kuwait</option>
                            <option value="Kyrgyzstan">Kyrgyzstan</option>
                            <option value="Laos">Laos</option>
                            <option value="Latvia">Latvia</option>
                            <option value="Lebanon">Lebanon</option>
                            <option value="Lesotho">Lesotho</option>
                            <option value="Liberia">Liberia</option>
                            <option value="Libya">Libya</option>
                            <option value="Liechtenstein">Liechtenstein</option>
                            <option value="Lithuania">Lithuania</option>
                            <option value="Luxembourg">Luxembourg</option>
                            <option value="Macau">Macau</option>
                            <option value="Macedonia">Macedonia</option>
                            <option value="Madagascar">Madagascar</option>
                            <option value="Malaysia">Malaysia</option>
                            <option value="Malawi">Malawi</option>
                            <option value="Maldives">Maldives</option>
                            <option value="Mali">Mali</option>
                            <option value="Malta">Malta</option>
                            <option value="Marshall Islands">Marshall Islands</option>
                            <option value="Martinique">Martinique</option>
                            <option value="Mauritania">Mauritania</option>
                            <option value="Mauritius">Mauritius</option>
                            <option value="Mayotte">Mayotte</option>
                            <option value="Mexico">Mexico</option>
                            <option value="Midway Islands">Midway Islands</option>
                            <option value="Moldova">Moldova</option>
                            <option value="Monaco">Monaco</option>
                            <option value="Mongolia">Mongolia</option>
                            <option value="Montserrat">Montserrat</option>
                            <option value="Morocco">Morocco</option>
                            <option value="Mozambique">Mozambique</option>
                            <option value="Myanmar">Myanmar</option>
                            <option value="Nambia">Nambia</option>
                            <option value="Nauru">Nauru</option>
                            <option value="Nepal">Nepal</option>
                            <option value="Netherland Antilles">Netherland Antilles</option>
                            <option value="Netherlands">Netherlands (Holland, Europe)</option>
                            <option value="Nevis">Nevis</option>
                            <option value="New Caledonia">New Caledonia</option>
                            <option value="New Zealand">New Zealand</option>
                            <option value="Nicaragua">Nicaragua</option>
                            <option value="Niger">Niger</option>
                            <option value="Nigeria">Nigeria</option>
                            <option value="Niue">Niue</option>
                            <option value="Norfolk Island">Norfolk Island</option>
                            <option value="Norway">Norway</option>
                            <option value="Oman">Oman</option>
                            <option value="Pakistan">Pakistan</option>
                            <option value="Palau Island">Palau Island</option>
                            <option value="Palestine">Palestine</option>
                            <option value="Panama">Panama</option>
                            <option value="Papua New Guinea">Papua New Guinea</option>
                            <option value="Paraguay">Paraguay</option>
                            <option value="Peru">Peru</option>
                            <option value="Phillipines">Philippines</option>
                            <option value="Pitcairn Island">Pitcairn Island</option>
                            <option value="Poland">Poland</option>
                            <option value="Portugal">Portugal</option>
                            <option value="Puerto Rico">Puerto Rico</option>
                            <option value="Qatar">Qatar</option>
                            <option value="Republic of Montenegro">Republic of Montenegro</option>
                            <option value="Republic of Serbia">Republic of Serbia</option>
                            <option value="Reunion">Reunion</option>
                            <option value="Romania">Romania</option>
                            <option value="Russia">Russia</option>
                            <option value="Rwanda">Rwanda</option>
                            <option value="St Barthelemy">St Barthelemy</option>
                            <option value="St Eustatius">St Eustatius</option>
                            <option value="St Helena">St Helena</option>
                            <option value="St Kitts-Nevis">St Kitts-Nevis</option>
                            <option value="St Lucia">St Lucia</option>
                            <option value="St Maarten">St Maarten</option>
                            <option value="St Pierre & Miquelon">St Pierre & Miquelon</option>
                            <option value="St Vincent & Grenadines">St Vincent & Grenadines</option>
                            <option value="Saipan">Saipan</option>
                            <option value="Samoa">Samoa</option>
                            <option value="Samoa American">Samoa American</option>
                            <option value="San Marino">San Marino</option>
                            <option value="Sao Tome & Principe">Sao Tome & Principe</option>
                            <option value="Saudi Arabia">Saudi Arabia</option>
                            <option value="Senegal">Senegal</option>
                            <option value="Seychelles">Seychelles</option>
                            <option value="Sierra Leone">Sierra Leone</option>
                            <option value="Singapore">Singapore</option>
                            <option value="Slovakia">Slovakia</option>
                            <option value="Slovenia">Slovenia</option>
                            <option value="Solomon Islands">Solomon Islands</option>
                            <option value="Somalia">Somalia</option>
                            <option value="South Africa">South Africa</option>
                            <option value="Spain">Spain</option>
                            <option value="Sri Lanka">Sri Lanka</option>
                            <option value="Sudan">Sudan</option>
                            <option value="Suriname">Suriname</option>
                            <option value="Swaziland">Swaziland</option>
                            <option value="Sweden">Sweden</option>
                            <option value="Switzerland">Switzerland</option>
                            <option value="Syria">Syria</option>
                            <option value="Tahiti">Tahiti</option>
                            <option value="Taiwan">Taiwan</option>
                            <option value="Tajikistan">Tajikistan</option>
                            <option value="Tanzania">Tanzania</option>
                            <option value="Thailand">Thailand</option>
                            <option value="Togo">Togo</option>
                            <option value="Tokelau">Tokelau</option>
                            <option value="Tonga">Tonga</option>
                            <option value="Trinidad & Tobago">Trinidad & Tobago</option>
                            <option value="Tunisia">Tunisia</option>
                            <option value="Turkey">Turkey</option>
                            <option value="Turkmenistan">Turkmenistan</option>
                            <option value="Turks & Caicos Is">Turks & Caicos Is</option>
                            <option value="Tuvalu">Tuvalu</option>
                            <option value="Uganda">Uganda</option>
                            <option value="United Kingdom">United Kingdom</option>
                            <option value="Ukraine">Ukraine</option>
                            <option value="United Arab Erimates">United Arab Emirates</option>
                            <option value="United States of America">United States of America</option>
                            <option value="Uraguay">Uruguay</option>
                            <option value="Uzbekistan">Uzbekistan</option>
                            <option value="Vanuatu">Vanuatu</option>
                            <option value="Vatican City State">Vatican City State</option>
                            <option value="Venezuela">Venezuela</option>
                            <option value="Vietnam">Vietnam</option>
                            <option value="Virgin Islands (Brit)">Virgin Islands (Brit)</option>
                            <option value="Virgin Islands (USA)">Virgin Islands (USA)</option>
                            <option value="Wake Island">Wake Island</option>
                            <option value="Wallis & Futana Is">Wallis & Futana Is</option>
                            <option value="Yemen">Yemen</option>
                            <option value="Zaire">Zaire</option>
                            <option value="Zambia">Zambia</option>
                            <option value="Zimbabwe">Zimbabwe</option>
                        </select>
                        <button className={isValidUser ? 'confirm-btn xxs:bg-blue-500 xxs:text-white' : 'confirm-btn xxs:bg-gray-500 xxs:text-white xxs:cursor-not-allowed'}>Confirm</button>
                    </form>
                </div>
            </div>
            <PrivacyCookies />
        </>
  )
}

const AccountHeader = () => {
    return (
        <header className='xxs:absolute xxs:top-0 xxs:w-full xxs:bg-yellow-300 xxs:flex xxs:flex-row xxs:justify-center xxs:items-center xxs:py-3'>
            <img className='xxs:h-8' src={legoLogo} alt="lego logo" />
            <h1 className='xxs:text-xl xxs:font-bold xxs:tracking-wide'>Account</h1>
        </header>
    )
}

const SocialMediaAccounts = () => {
    return (
        <ul className='xxs:flex xxs:flex-row xxs:w-2/3 xxs:justify-evenly xxs:py-3'>
            <li className='xxs:flex xxs:flex-row xxs:justify-center xxs:items-center xxs:h-12 xxs:w-12 xxs:bg-blue-600 xxs:rounded-md'>
                <Link to='#'><BsFacebook className='xxs:h-6 xxs:w-6 xxs:text-white' /></Link>
            </li>
            <li className='xxs:flex xxs:flex-row xxs:justify-center xxs:items-center xxs:h-12 xxs:w-12 xxs:bg-white xxs:border-1 xxs:border-gray-500 xxs:rounded-md'>
                <Link to='#'><FcGoogle className='xxs:h-6 xxs:w-6 xxs:text-white' /></Link>
            </li>
            <li className='xxs:flex xxs:flex-row xxs:justify-center xxs:items-center xxs:h-12 xxs:w-12 xxs:bg-black xxs:rounded-md'>
                <Link to='#'><BsApple className='xxs:h-6 xxs:w-6 xxs:text-white' /></Link>
            </li>
        </ul>
    )
}

export const PrivacyCookies = () => {
    return (
        <div className='fixed bottom-0 right-5 bg-slate-100 border-1 border-gray-300 px-2 rounded-t-lg'>
            <span className='text-xs text-blue-500'>
                <Link to='#'>
                    Privacy Policy | Cookies
                </Link>

            </span>
        </div>
    )
}
