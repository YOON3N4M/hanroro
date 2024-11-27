import { useAttachment } from "@/hooks/useAttachment";
import { API_TAG } from "@/services";
import { revalidateApi } from "@/services/_server";
import { uploadSchedule } from "@/services/firebase";
import { ScheduleDoc, ScheduleType } from "@/types";
import { cn, getNumberDate } from "@/utils";
import { isMatch } from "date-fns";
import { ChangeEvent, HTMLAttributes, useRef, useState } from "react";
import { UseFormRegister, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import ModalTemplate from "../ModalTemplate";
import { TYPE_FILTER } from "@/containers/calendar";
import useModal from "../useModal";
import useToast from "@/components/toast/useToast";

interface ScheduleUploadModalProps {}

const MESSAGE = {
  notValidationDate: "올바르지 않은 형태의 날짜/시간이 입력되었습니다.",
  fastEndDate: "종료 날짜가 시작 날짜보다 빠릅니다.",
};

function ScheduleUploadModal(props: ScheduleUploadModalProps) {
  const {} = props;

  const { register, handleSubmit } = useForm<ScheduleDoc>();
  const { handleChangeAttachment, generateURL, tempAttachment } =
    useAttachment();
  const formRef = useRef<HTMLFormElement | null>(null);
  const { closeAllModal } = useModal();
  const { addToast } = useToast();

  const [errorMsg, setErrorMsg] = useState<string | undefined>();

  async function forceSubmitRevalidateForm() {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  }

  async function onSubmit(data: ScheduleDoc) {
    const { startDate, endDate, startTime, endTime, type } = data;

    console.log(startDate, endDate, startTime, endTime);

    const dateValue = [startDate, endDate].map((item) =>
      item === null ? null : isMatch(item!, "yyyy-MM-dd")
    );
    const timeValue = [startTime, endTime].map((item) =>
      item === null ? null : isMatch(item!, "kk:mm")
    );

    const isValidate = [...dateValue, ...timeValue].every(
      (item) => item === true || item === null
    );

    if (!isValidate) {
      setErrorMsg(MESSAGE.notValidationDate);
      return;
    } else {
      setErrorMsg(undefined);
    }

    if (endDate) {
      getNumberDate(startDate) > getNumberDate(endDate) &&
        setErrorMsg(MESSAGE.fastEndDate);

      return;
    }

    let url = null;

    if (tempAttachment) {
      const storageFileName = uuidv4();
      url = await generateURL(`schedule/${storageFileName}`);
    }

    const newData: ScheduleDoc = {
      ...data,
      images: url,
      type: type,
      createAt: new Date().getTime(),
    };

    await uploadSchedule(newData);
    await forceSubmitRevalidateForm();
    addToast({ message: "일정이 정상적으로 등록 되었습니다." });
    closeAllModal();
  }

  return (
    <ModalTemplate>
      <div className="relative pc:min-w-[500px] mo:min-w-[80vw] min-h-[30vh] max-w-[500px] mo:max-w-[300px] text-sm flex flex-col">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <SelectField
            register={register}
            name="일정 유형"
            keyValue="type"
            require
            optionList={TYPE_FILTER}
          />
          <InputField
            register={register}
            name="일정 명"
            keyValue="title"
            require
          />
          <div className="flex gap-sm">
            <InputField
              className="flex-1"
              register={register}
              name="시작 날짜"
              require
              keyValue="startDate"
              placeholder="YYYY-MM-DD"
            />
            <InputField
              className="flex-1"
              register={register}
              name="종료 날짜"
              keyValue="endDate"
              placeholder="YYYY-MM-DD"
            />
          </div>
          <div className="flex gap-sm">
            <InputField
              className="flex-1"
              register={register}
              name="시작 시간"
              keyValue="startTime"
              placeholder="00:00 (24h)"
            />
            <InputField
              className="flex-1"
              register={register}
              name="종료 시간"
              keyValue="endTime"
              placeholder="00:00 (24h)"
            />
          </div>
          <InputField register={register} name="장소" keyValue="location" />
          <InputField register={register} name="설명" keyValue="desc" />
          <InputField register={register} name="관련 링크" keyValue="link" />
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
  );
}

export default ScheduleUploadModal;

interface FieldProps {
  keyValue: keyof ScheduleDoc;
  name: string;
  register: UseFormRegister<ScheduleDoc>;
  require?: boolean;
}

interface InputFieldProps extends HTMLAttributes<HTMLDivElement>, FieldProps {
  placeholder?: string;
}

function InputField(props: InputFieldProps) {
  const {
    name,
    keyValue,
    register,
    className,
    placeholder,
    require = false,
  } = props;
  return (
    <div className={cn("flex flex-col mt-sm", className)}>
      <label>
        {name}
        {require && <span className="ml-xxs text-red-500">*</span>}
      </label>
      <input
        className="input mt-xs"
        {...register(keyValue, {
          setValueAs: (value) => (value === "" ? null : value),
        })}
        required={require}
        placeholder={placeholder || ""}
      />
    </div>
  );
}

interface SelectFieldProps extends FieldProps {
  optionList: any[];
}

function SelectField(props: SelectFieldProps) {
  const { register, keyValue, optionList, require } = props;

  return (
    <div className="flex flex-col">
      <label>
        유형 {require && <span className="ml-xxs text-red-500">*</span>}
      </label>
      <select {...register(keyValue)} className="mt-xs select">
        {optionList.map((type, idx) => (
          <option
            key={`${type.type}-option`}
            value={type.type}
            selected={idx === 0}
          >
            {type.kor}
          </option>
        ))}
      </select>
    </div>
  );
}
