'use client'

import { format, startOfMonth } from 'date-fns'
import useCalendar from './useCalendar'
import { IconRightLeft, IconRightRight } from '../svg'
import { cn } from '@/utils'
import { Schedule, SCHEDULE_LIST, ScheduleType } from '@/data/schedule'
import useModal from '../modal/useModal'
import ScheduleViewModal from '../modal/form/ScheduleViewModal'

const weeks = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export default function Calendar() {
	const { currentDate, daysOfMonth, nextMonth, prevMonth } = useCalendar()

	return (
		<div className="text-xs">
			{/* controller */}
			<div className="flex justify-between">
				<div className="flex min-w-[80px] justify-center">
					<span>
						{format(currentDate, 'yyyy')}.{format(currentDate, 'MM')}
					</span>
				</div>
				<div className="flex min-w-[80px] justify-center">
					<button onClick={prevMonth}>
						<IconRightLeft />
					</button>
					<button onClick={nextMonth}>
						<IconRightRight />
					</button>
				</div>
			</div>
			{/* MTWTFSS */}
			<div className="grid grid-cols-7 mt-xs">
				{weeks.map((week, idx) => (
					<div key={week} className="flex justify-center">
						<span className={cn(idx === weeks.length - 1 && 'text-red-300')}>
							{week}
						</span>
					</div>
				))}
			</div>
			{/* days */}
			<div className="grid grid-cols-7 mt-xs">
				{daysOfMonth.map((day, idx) => (
					<DayGrid
						key={`${format(day, 'yyyy-MM-dd')}-${idx}`}
						day={day}
						currentDate={currentDate}
					/>
				))}
			</div>
		</div>
	)
}

export const scheduleTypeColorStyles: {
	[key in ScheduleType]: { default: string; hover: string }
} = {
	concert: { default: 'bg-blue-300', hover: 'hover:bg-blue-400' },
	event: { default: 'bg-yellow-200', hover: 'hover:bg-yellow-400' },
	anniversary: { default: 'bg-red-300', hover: 'hover:bg-red-400' },
	release: { default: 'bg-blue-300', hover: 'bg-blue-400' },
	etc: { default: 'bg-blue-300', hover: 'bg-blue-400' },
}

function DayGrid({ currentDate, day }: { currentDate: Date; day: Date }) {
	const formattedDay = format(day, 'yyyy-MM-dd')
	const isSunday = format(day, 'iii') === 'Sun'
	const isDayOfCurrentDate = format(day, 'LLL') === format(currentDate, 'LLL')

	const scheduleListOfDay = SCHEDULE_LIST.filter((schedule) =>
		schedule.date.includes(formattedDay),
	)
	console.log(scheduleListOfDay)
	return (
		<div className="min-h-[50px]">
			<div className="flex justify-center">
				<span
					className={cn(
						isSunday && 'text-red-300',
						!isDayOfCurrentDate && 'opacity-40',
					)}
				>
					{format(day, 'dd')}
				</span>
			</div>
			<div className="flex flex-col items-center justify-center mt-xxxs">
				{scheduleListOfDay.map((schedule) => (
					<ScheduleItem key={schedule.title} schedule={schedule} />
				))}
			</div>
		</div>
	)
}

function ScheduleItem({ schedule }: { schedule: Schedule }) {
	const { openSingleModal } = useModal()

	function onClickSchedule() {
		openSingleModal(<ScheduleViewModal schedule={schedule} />)
	}
	return (
		<button
			onClick={onClickSchedule}
			key={schedule.title}
			className={cn(
				'w-[80%] min-h-[5px] rounded-md',
				scheduleTypeColorStyles[schedule.type].default,
				scheduleTypeColorStyles[schedule.type].hover,
			)}
		></button>
	)
}
