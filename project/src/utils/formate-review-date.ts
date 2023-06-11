import dayjs from 'dayjs';
import 'dayjs/locale/ru';

export const createReviewDate = (createAt: string): string => {
  const formattedDate: string = dayjs(createAt).locale('ru').format('DD MMMM');
  return formattedDate;
};

