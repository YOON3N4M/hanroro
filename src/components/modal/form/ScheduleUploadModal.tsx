import { HTMLAttributes } from "react";
import ModalTemplate from "../ModalTemplate";
import {
  useForm,
  SubmitHandler,
  UseFormRegister,
  FieldValues,
} from "react-hook-form";
import { cn, validationDateFormat } from "@/utils";
import { useAttachment } from "@/hooks/useAttachment";
import { ScheduleDoc } from "@/types";

interface ScheduleUploadModalProps {}

const MESSAGE = {
  notValidationDate: "올바르지 않은 형태의 날짜/시간이 입력되었습니다. ",
};

function ScheduleUploadModal(props: ScheduleUploadModalProps) {
  const {} = props;

  const { register, handleSubmit } = useForm<ScheduleDoc>();
  const { handleChangeAttachment, generateURL } = useAttachment();

  function onSubmit(data: ScheduleDoc) {
    const { startDate, endDate, startTime, endTime } = data;

    const dateValue = [startDate, endDate, startTime, endTime];
    const dateValidateResult = dateValue.map((item) =>
      item === "" ? true : validationDateFormat(item!)
    );

    // const is;
    console.log(dateValidateResult);
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
            />
            <Field
              className="flex-1"
              register={register}
              name="종료 날짜"
              keyValue="endDate"
            />
          </div>
          <div className="flex gap-sm">
            <Field
              className="flex-1"
              register={register}
              name="시작 시간"
              keyValue="startTime"
            />
            <Field
              className="flex-1"
              register={register}
              name="종료 시간"
              keyValue="endTime"
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
          <button type="submit" className="mt-sm border w-max button ml-auto">
            등록
          </button>
        </form>
      </div>
    </ModalTemplate>
  );
}

export default ScheduleUploadModal;

interface FieldProps extends HTMLAttributes<HTMLDivElement> {
  keyValue: keyof ScheduleDoc;
  name: string;
  register: UseFormRegister<ScheduleDoc>;
  require?: boolean;
}

function Field(props: FieldProps) {
  const { name, keyValue, register, className, require = false } = props;
  return (
    <div className={cn("flex flex-col mt-sm", className)}>
      <label>
        {name}
        {require && <span className="ml-xxs text-red-500">*</span>}
      </label>
      <input
        className="input mt-xs"
        {...register(keyValue)}
        required={require}
      />
    </div>
  );
}
