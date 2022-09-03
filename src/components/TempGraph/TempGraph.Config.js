export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Temperature (°C)",
    },
    tooltip: {
      enabled: true,
      callbacks: {
        label: (context) => {
          let label = `${context.dataset.label} ${context.formattedValue}°C`;
          return label;
        },
      },
    },
  },
};
