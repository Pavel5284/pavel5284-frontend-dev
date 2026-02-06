import {useFormik} from "formik";
import * as Yup from 'yup';
import style from "./ContactsPage.module.css";
import {useRef, useState} from "react";
import {AxiosError} from "axios";
import {formAPI} from "@/api/api.ts";
import CustomizedSnackbar from "@/common/components/CustomizedSnackbar/CustomizedSnackbar.tsx";
import {MainButton} from "@/common/components/mainButton/MainButton.tsx";
import {useTranslation} from "react-i18next";
import ReCAPTCHA from "react-google-recaptcha";


export const ContactsForm = () => {
    const {t} = useTranslation();
    const [status, setStatus] = useState(false)
    const [isSend, setIsSend] = useState(false)
    const [networkError, setNetworkError] = useState<null | string>(null)
    const [captchaVerified, setCaptchaVerified] = useState(false);
    const recaptchaRef = useRef<ReCAPTCHA>(null);

    // Pass the useFormik() hook initial form values and a submit function that will
    // be called when the form is submitted
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            subject: '',
            message: ''
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .max(20, 'Must be 20 characters or less')
                .required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
            message: Yup.string()
                .max(500, 'Must be 500 characters or less')
                .required('Required'),
        }),
        onSubmit: async (values, onSubmitProps) => {
            console.log('Form Data', values)
            console.log('submit props', onSubmitProps)

            try {
                setStatus(true)
                await
                    formAPI.send(values)

                onSubmitProps.resetForm({})
                //  onSubmitProps.setStatus({success: true})
                setNetworkError(null)
                setIsSend(true)

            } catch (errors) {
                let err = errors as AxiosError
                console.log(errors)
                // onSubmitProps.setStatus({success: false})

                setNetworkError(err.message)

            } finally {
                setStatus(false)
            }
        },


    });
    return (
        <form className={style.contact__form} onSubmit={formik.handleSubmit}>
            <p className={style.contact__form_title}>{t('contacts.sendMessage')}</p>
            <div className={style.contact__form_box}>
                <div className={style.input__wrapper}>
                    <input className={style.contact__form_input}
                           id="name"
                           name="name"
                           type="text"
                           placeholder={t('contacts.form.name')}
                           onChange={formik.handleChange}
                           value={formik.values.name}
                    />
                    {formik.touched.name && formik.errors.name ? (
                        <div className={style.error}>{formik.errors.name}</div>
                    ) : null}
                </div>

                <div className={style.input__wrapper}>
                    <input className={style.contact__form_input}
                           id="email"
                           name="email"
                           type="email"
                           placeholder={t('contacts.form.email')}
                           onChange={formik.handleChange}
                           value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div className={style.error}>{formik.errors.email}</div>
                    ) : null}
                </div>
            </div>

            <div className={style.input__wrapper}>
                <input className={style.contact__form_input}
                       id="subject"
                       name="subject"
                       type="text"
                       placeholder={t('contacts.form.subject')}
                       onChange={formik.handleChange}
                       value={formik.values.subject}
                />
            </div>
            <div className={style.input__wrapper}>
            <textarea className={style.contact__form_textarea}
                      id="message"
                      name="message"
                      placeholder={t('contacts.form.message')}
                      onChange={formik.handleChange}
                      value={formik.values.message}
            />
                {formik.touched.message && formik.errors.message ? (
                    <div style={{marginBottom: "20px"}}  className={style.error}>{formik.errors.message}</div>
                ) : null}
            </div>
            <ReCAPTCHA
                style={{marginBottom: "20px"}}
                ref={recaptchaRef}
                sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                onChange={() => setCaptchaVerified(true)}
                onExpired={() => setCaptchaVerified(false)}
            />
            <MainButton disabled={status || !captchaVerified} onClick={formik.handleSubmit}>
                {t('contacts.form.submit')}
            </MainButton>
            {/*<button
                disabled={status}
                className={style.btn} type="submit">Send Message
            </button>*/}
            <CustomizedSnackbar networkError={networkError} setNetworkError={setNetworkError} isSend={isSend}
                                setIsSend={setIsSend}/>
        </form>


    );
};