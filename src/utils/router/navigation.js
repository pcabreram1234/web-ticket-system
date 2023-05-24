const handleNavBarNavigation = (key) => {
  let pageToNavigate = "";
  switch (key) {
    case "Home-Menu-option":
      pageToNavigate = "/";
      break;

    case "Offers-Menu-option":
      pageToNavigate = "/Offers";
      break;

    case "Schedule-Menu-option":
      pageToNavigate = "/Schedule";
      break;

    case "Reservation-Menu-option":
      pageToNavigate = "/Reservation";
      break;

    case "Log-In-Menu-option":
      pageToNavigate = "/Login";
      console.log("hola");
      break;

    default:
      pageToNavigate = "/";
      break;
  }
  return pageToNavigate;
};

export { handleNavBarNavigation };
