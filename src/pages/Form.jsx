import { useCallback, useEffect, useState } from "react";

// ICONS
import { FaArrowLeft, FaXmark } from "react-icons/fa6";
import { RxLockClosed } from "react-icons/rx";

// IMAGES
import greyImage from '../assets/greyImage.png'

// OTHERS
import { toast } from 'react-toastify';

const Form = () => {
    const [step, setStep] = useState(1)
    const [inputData, setInputData] = useState({
        marketingBudget: '',
        name: '',
        email: '',
        phoneNumber: '',
        message: ''
    })

    const budgetList = [
        { key: '< $1,000/mo', value: '< $1,000/mp' },
        { key: '$1,000 - $2,000', value: '$1,000 - $2,000' },
        { key: '$2,000 - $5,000', value: '$2,000 - $5,000' },
        { key: '$5,000 - $10,000', value: '$5,000 - $10,000' },
        { key: '$10,000 - $25,000', value: '$10,000 - $25,000' },
        { key: '$25,000 +', value: '$25,000 +' }
    ]

    const handleMonthlyBudget = useCallback((value) => {
        setInputData(prev => {
            return {
                ...prev,
                ['marketingBudget']: value
            }
        })
        setStep(2)
    }, [inputData])

    const handleInputChange = useCallback((e) => {
        setInputData(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }, [inputData])

    const handleSubmit = useCallback(() => {
        for (const property in inputData) {
            if (property == 'email') {
                const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                console.log(inputData[property].match(emailRegex))
                if (!inputData[property].match(emailRegex)) {
                    toast.error("Invalid E-mail")
                    return
                }
            }
            if (inputData[property] == '') {
                toast.error("Please fill al the fields")
                return
            }
        }
        console.log(inputData)
        setStep(3)
    }, [inputData])

    return (
        <div className="flex flex-col h-screen">
            <div className="topBar bg-[#FFFFFF] h-[52px] flex justify-between items-center py-4 px-10 font-lato">
                <button className="flex items-center gap-2 cursor-pointer" disabled={step == 1} onClick={() => setStep(prev => prev - 1)}>
                    <FaArrowLeft className="text-base" />
                    <p className="text-sm font-semibold">Go Back</p>
                </button>
                <div className="flex items-center gap-2 cursor-pointer">
                    <p className="text-sm font-semibold">Exit</p>
                    <FaXmark className="text-base" />
                </div>
            </div>

            <div className="mainBody bg-[#F9FAFB] grow pt-7 flex flex-col">
                <div className="progessBar h-2 w-full bg-[#E5E7EB] relative">
                    <div className={`totalProgress absolute h-full bg-[#019F44] w-[0px]`}
                        style={{ width: `calc((${step}/3)*100%)`, transition: 'all 300ms' }}
                    > </div>
                </div>
                <div className="flex items-center justify-center grow py-12">
                    {step == 1 ? (
                        <div className="step1Continer flex flex-col text-center gap-11  w-[90%] max-w-[480px] ">
                            <p className="font-semibold text-xl lg:text-[28px] font-Montserrat">Step # 1</p>
                            <p className="font-semibold text-xl lg:text-[28px] font-Montserrat leading-7 lg:leading-9">What is your monthly digital marketing budget?</p>
                            <div className="budgetList flex flex-col gap-4">
                                {budgetList?.map((val, index) => {
                                    return (
                                        <div onClick={() => handleMonthlyBudget(val?.value)} key={index} className="bg-[#FFFFFF] h-[50px] lg:h-[70px] cursor-pointer rounded-lg border border-[#E5E7EB] flex items-center justify-center"
                                            style={inputData?.marketingBudget == val.value ? { borderColor: '#35DE14' } : {}}>
                                            <p className="text-base lg:text-lg text-[#6B7280] font-medium font-lato">{val?.key}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    ) : step == 2 ? (
                        <div className="step2Container w-[90%] max-w-[520px]">
                            <div className="flex flex-col gap-3 text-center">
                                <p className="font-semibold text-xl lg:text-[28px] font-Montserrat leading-9">Step # 2</p>
                                <p className="font-semibold text-xl lg:text-[28px] font-Montserrat  leading-9">Details</p>
                                <p className="text-sm lg:text-base font-normal text-[#6B7280] font-lato leading-5 lg:leading-6">We’re thrilled at the opportunity to help you grow your business online. Please let us know the best way to reach you.</p>
                            </div>
                            <div className="step2InputForm mt-10 lg:mt-12 font-lato flex flex-col gap-4">
                                <div className="nameContainer">
                                    <p className="text-xs font-semibold">Name</p>
                                    <input onChange={(e) => handleInputChange(e)} name="name" value={inputData?.name} type="text" className="h-11 lg:h-12 text-sm lg:text-base mt-1 border border-[#E5E7EB] rounded-[3px] w-full box-border py-[3px] px-2 lg:py-1 lg:px-3 focus:outline-none" />
                                </div>
                                <div className="emailPhoneContainer flex flex-col gap-4 custom:flex-row">
                                    <div className="nameContainer custom:w-[50%]">
                                        <p className="text-xs font-semibold">Email</p>
                                        <input onChange={(e) => handleInputChange(e)} name="email" value={inputData?.email} type="text" className="h-11 lg:h-12 text-sm lg:text-base mt-1 border border-[#E5E7EB] rounded-[3px] w-full box-border py-[3px] px-2 lg:py-1 lg:px-3 focus:outline-none" />
                                    </div>
                                    <div className="nameContainer custom:w-[50%]">
                                        <p className="text-xs font-semibold">Phone Number</p>
                                        <input onChange={(e) => handleInputChange(e)} name="phoneNumber" value={inputData?.phoneNumber} type="text" className="h-11 lg:h-12 text-sm lg:text-base mt-1 border border-[#E5E7EB] rounded-[3px] w-full box-border py-[3px] px-2 lg:py-1 lg:px-3 focus:outline-none" />
                                    </div>
                                </div>
                                <div className="messageContainer">
                                    <p className="text-xs font-semibold">Anything else you’d like to share?</p>
                                    <textarea onChange={(e) => handleInputChange(e)} name="message" value={inputData?.message} type="text" className="h-[112px] text-sm lg:text-base mt-1 border border-[#E5E7EB] rounded-[3px] w-full  py-2 px-2 lg:py-1 lg:px-3 focus:outline-none resize-none" />
                                </div>
                            </div>
                            <button onClick={handleSubmit} className="rounded-[2px] block mx-auto mt-8 text-white font-[14px] lg:font-[15px] w-[150px] h-[43px] lg:w-[160px] lg:h-[48px] bg-[#019F44] font-lato">Send Request</button>
                            <div className="flex items-center text-[#6B7280] font-lato gap-3 mx-auto w-fit mt-8">
                                <RxLockClosed className="shrink-0" />
                                <p className="text-sm font-normal">We promise never to share your information or spam your inbox</p>
                            </div>
                        </div>

                    ) : (
                        <div className="step3Container w-[90%] max-w-[520px]">
                            <img src={greyImage} className="mx-auto" alt="" />
                            <p className="mt-6 font-semibold text-xl lg:text-[28px] text-center font-Montserrat">Your Request for a Proposal Has Been Submitted!</p>
                            <p className="text-sm mt-3 lg:text-base font-normal text-[#6B7280] font-lato leading-5 lg:leading-6 text-center">Lorem ipsum dolor sit amet consectetur. Tincidunt ultrices dis gravida parturient urna tristique congue. Curabitur volutpat nulla convallis eget pellentesque. Luctus tellus eu ultrices egestas.</p>
                            <button className="rounded-[2px] block mx-auto mt-6 text-white font-[14px] lg:font-[15px] w-[150px] h-[43px] lg:w-[160px] lg:h-[48px] bg-[#019F44] font-lato"
                                onClick={() => {
                                    setStep(1)
                                    setInputData({
                                        marketingBudget: '',
                                        name: '',
                                        email: '',
                                        phoneNumber: '',
                                        message: ''
                                    })
                                }}>Return Home</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Form