export const customStyles = `
  input[type="number"]::placeholder {
    color: #9CA3AF !important;
    opacity: 1 !important;
  }
  input[type="number"]::-webkit-input-placeholder {
    color: #9CA3AF !important;
    opacity: 1 !important;
  }
  input[type="number"]::-moz-placeholder {
    color: #9CA3AF !important;
    opacity: 1 !important;
  }
  
  /* Make spinner always visible and make the number value darker/more visible */
  input[type="number"] {
    color: #9CA3AF !important;
    font-weight: 500 !important;
  }
  
  /* Always show spinner buttons (remove hover requirement) */
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    opacity: 1 !important;
    position: relative !important;
    cursor: pointer !important;
  }
`;
