import { signup } from "api/member";
import { AuthButton, AuthInput } from "components/Common";
import { AuthBottomWrapper } from "components/Common/atoms/Wrappers/AuthWrapper/style";
import { InputsWrapper } from "components/SignUp/atoms/Wrapper/style";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { signUpObject, signUpStep } from "recoilAtoms/recoilAtomContainer";
import { SignupForm } from "types";
import { isNotNull } from "utils/isNotNull";

const PasswordCheck = () => {
    const router = useRouter();
    const { register, setValue, watch, handleSubmit} = useForm<SignupForm>()
    const [isCheck, setIsCheck] = useState(false);
    const [SignUpObject, ] = useRecoilState(signUpObject);
    const [, setSignUpStep] = useRecoilState(signUpStep);

    useEffect(() => {
        setIsCheck(isNotNull(watch('password') && watch('passwordCheck')))
    },[watch(['password', 'passwordCheck'])])

    const onInvalid:SubmitErrorHandler<SignupForm> = (state) => toast.error(state.password?.message || state.passwordCheck?.message)

    const onValid:SubmitHandler<SignupForm> = async (state) => {
        if(state.password !== state.passwordCheck) return toast.error('비밀번호확인이 비밀번호와 맞지 않습니다.')
        // const {data}:any =  await signup(SignUpObject.email||"", state.password||"", SignUpObject.name||"", SignUpObject.stuId||0,SignUpObject.gender || "남");
        // if(data) router.push('/signin');
        router.push('/signin');
    }

    return (
        <form>
            <InputsWrapper>
                <p>비밀번호</p>
                <AuthInput
                    register={register("password", {
                        required: "비밀번호를 입력해주세요.",
                        pattern: {
                            value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/,
                            message: "영문, 숫자, 특수문자 포함 8~20자로 입력하세요.",
                        },
                    })}
                    type="password"
                    placeholder="영문,숫자,특수문자 포함 8~20자"
                    maxLength={20}
                    DeleteBtnClick={() => setValue('password', undefined)}
                    isValue={isNotNull(watch('password'))}
                />
                <p>비밀번호 확인</p>
                <AuthInput
                    register={register("passwordCheck", {
                        required: "비밀번호확인칸을 입력해주세요.",
                    })}
                    type="password"
                    placeholder="비밀번호확인"
                    maxLength={20}
                    DeleteBtnClick={() => setValue('passwordCheck', undefined)}
                    isValue={isNotNull(watch('passwordCheck'))}
                />
            </InputsWrapper>
            <AuthBottomWrapper>
                <AuthButton text={"다음"} isCheck={isCheck} onClick={handleSubmit(onValid, onInvalid)} type={"submit"}/>
                <p>이미 회원이라면?<Link href={"/signin"}>로그인</Link></p>
            </AuthBottomWrapper>
        </form>
    )
}

export default PasswordCheck;