import { HTMLAttributes, useRef, useState } from 'react'
import ModalTemplate from '../ModalTemplate'
import {
	useForm,
	SubmitHandler,
	UseFormRegister,
	FieldValues,
} from 'react-hook-form'
import { cn, validationDateFormat } from '@/utils'
import { useAttachment } from '@/hooks/useAttachment'
import { ScheduleDoc } from '@/types'
import { isMatch } from 'date-fns'
import { revalidateApi } from '@/services/_server'
import { API_TAG } from '@/services'
import { v4 as uuidv4 } from 'uuid'
import { uploadSchedule } from '@/services/firebase'

interface ScheduleUploadModalProps {}

const MESSAGE = {
	notValidationDate: '올바르지 않은 형태의 날짜/시간이 입력되었습니다. ',
}

function ScheduleUploadModal(props: ScheduleUploadModalProps) {
	const {} = props

	const { register, handleSubmit } = useForm<ScheduleDoc>()
	const { handleChangeAttachment, generateURL, tempAttachment } =
		useAttachment()

	const formRef = useRef<HTMLFormElement | null>(null)
	const [errorMsg, setErrorMsg] = useState<string | undefined>()

	async function forceSubmitRevalidateForm() {
		if (formRef.current) {
			formRef.current.requestSubmit()
		}
	}

	async function onSubmit(data: ScheduleDoc) {
		const { startDate, endDate, startTime, endTime } = data

		console.log(startDate, endDate, startTime, endTime)

		const dateValue = [startDate, endDate].map((item) =>
			item === '' ? null : isMatch(item!, 'yyyy-MM-dd'),
		)
		const timeValue = [startTime, endTime].map((item) =>
			item === '' ? null : isMatch(item!, 'kk:mm'),
		)

		const isValidate = [...dateValue, ...timeValue].every(
			(item) => item === true || item === null,
		)

		if (!isValidate) {
			setErrorMsg(MESSAGE.notValidationDate)
			return
		} else {
			setErrorMsg(undefined)
		}
		// const dateValidateResult = dateValue.map((item) =>
		//   item === "" ? true : validationDateFormat(item!)
		// );
		// '' 검증
		const validateObj = Object.entries(data).reduce(
			(acc: any, [key, value]) => {
				acc[key] = value === '' ? null : value
				return acc
			},
			{},
		)
		let url = null

		if (tempAttachment) {
			const storageFileName = uuidv4()
			url = await generateURL(`schedule/${storageFileName}`)
		}

		const newData: ScheduleDoc = {
			...validateObj,
			images: url,
			createAt: new Date().getTime(),
		}

		await uploadSchedule(newData)
		await forceSubmitRevalidateForm()
	}

	return (
		<ModalTemplate>
			<div className="relative pc:min-w-[500px] mo:min-w-[80vw] min-h-[30vh] max-w-[500px] mo:max-w-[300px] text-sm flex flex-col">
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
					<Field register={register} name="일정 명" keyValue="title" require />
					<div className="flex gap-sm">
						<Field
							className="flex-1"
							register={register}
							name="시작 날짜"
							require
							keyValue="startDate"
							placeholder="YYYY-MM-DD"
						/>
						<Field
							className="flex-1"
							register={register}
							name="종료 날짜"
							keyValue="endDate"
							placeholder="YYYY-MM-DD"
						/>
					</div>
					<div className="flex gap-sm">
						<Field
							className="flex-1"
							register={register}
							name="시작 시간"
							keyValue="startTime"
							placeholder="00:00 (24h)"
						/>
						<Field
							className="flex-1"
							register={register}
							name="종료 시간"
							keyValue="endTime"
							placeholder="00:00 (24h)"
						/>
					</div>
					<Field register={register} name="장소" keyValue="location" />
					<Field register={register} name="설명" keyValue="desc" />
					<Field register={register} name="관련 링크" keyValue="link" />
					{/* 이미지 인풋 */}
					<input
						type="file"
						className="mt-sm"
						onChange={handleChangeAttachment}
					/>
					{errorMsg && <p className="mt-sm text-xs text-red-400">{errorMsg}</p>}
					<button type="submit" className="mt-sm border w-max button ml-auto">
						등록
					</button>
				</form>
				<form
					className="visually-hidden"
					ref={formRef}
					action={() => revalidateApi(API_TAG.schedule)}
				></form>
			</div>
		</ModalTemplate>
	)
}

export default ScheduleUploadModal

interface FieldProps extends HTMLAttributes<HTMLDivElement> {
	keyValue: keyof ScheduleDoc
	name: string
	register: UseFormRegister<ScheduleDoc>
	require?: boolean
	placeholder?: string
}

function Field(props: FieldProps) {
	const {
		name,
		keyValue,
		register,
		className,
		placeholder,
		require = false,
	} = props
	return (
		<div className={cn('flex flex-col mt-sm', className)}>
			<label>
				{name}
				{require && <span className="ml-xxs text-red-500">*</span>}
			</label>
			<input
				className="input mt-xs"
				{...register(keyValue)}
				required={require}
				placeholder={placeholder || ''}
			/>
		</div>
	)
}
