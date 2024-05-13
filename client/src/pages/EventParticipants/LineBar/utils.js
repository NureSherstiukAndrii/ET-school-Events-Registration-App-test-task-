import formatDate from "../../Events/utils/formatDate";

export const convertData = (registration) => {
  const labels = registration.map(elem => formatDate(elem.registration_date));
  const values = registration.map(elem => elem.registration_count);

  return {
    labels,
    datasets: [
      {
        label: 'Count of registrations',
        data: values,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
    borderWidth: 1
  };
};
