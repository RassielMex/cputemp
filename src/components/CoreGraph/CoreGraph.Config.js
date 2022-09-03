export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Core usage %",
    },
    tooltip: {
      enabled: true,
      callbacks: {
        label: (context) => {
          let label = `${context.dataset.label} ${context.formattedValue}%`;
          return label;
        },
      },
    },
  },
};
