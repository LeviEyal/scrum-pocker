import { format } from "date-fns";
import { useEffect, useState } from "react";

export const useClock = (formatString = "HH:mm:ss E dd MMM") => {
	const [nowDate, setNowDate] = useState(new Date());

	useEffect(() => {
		const interval = setInterval(() => {
			setNowDate(new Date());
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	return format(nowDate, formatString);
};