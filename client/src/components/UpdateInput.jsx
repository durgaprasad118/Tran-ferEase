const UpdateInput = ({ type, label, onChange, value, placeholder }) => {
  return (
    <div className="mb-5">
      <label className="block mb-1 mx-1 text-sm font-medium  text-gray-600">
        {label}
      </label>
      <input
        value={value}
        onChange={onChange}
        type={type}
        name={label}
        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
      />
    </div>
  );
};

export { UpdateInput };
