import dayjs from 'dayjs';
import 'dayjs/locale/ru';

type createReviewDateProps = {
  createAt: string;
}

export const createReviewDate = ({createAt}: createReviewDateProps): string => {
  const formattedDate: string = dayjs(createAt).locale('ru').format('DD MMMM');
  return formattedDate;
};

