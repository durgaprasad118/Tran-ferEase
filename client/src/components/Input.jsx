const Input = ({ label, placeholder, type, register }) => {
  return (
    <div className="mb-5">
      <label className="block mb-1 mx-1 text-sm font-medium  text-gray-600">
        {label}
      </label>
      <input
        {...register(label)}
        type={type}
        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        required
      />
    </div>
  );
};

export { Input };
