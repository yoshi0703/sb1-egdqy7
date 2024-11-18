interface TextAreaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  label: string;
}

export const TextArea = ({ value, onChange, placeholder, label }: TextAreaProps) => {
  const charCount = value.trim().length;
  const isValid = charCount >= 2 && charCount <= 200;
  const remainingChars = 200 - charCount;

  return (
    <div className="space-y-2">
      <label className="block text-2xl font-semibold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
        {label}
      </label>
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={200}
          className={`clay-input min-h-[150px] resize-none ${
            !isValid && value.length > 0 ? 'ring-2 ring-red-500/20' : ''
          }`}
        />
        <div className="absolute bottom-3 right-3 text-sm px-2 py-1 rounded-md bg-white/80 backdrop-blur-sm">
          <span className={`${!isValid ? 'text-red-500' : 'text-gray-500'}`}>
            {charCount}/200
          </span>
        </div>
      </div>
      {value.length > 0 && !isValid && (
        <p className="text-red-500 text-sm mt-2">
          {charCount < 2 ? '2文字以上入力してください' : '200文字以内で入力してください'}
        </p>
      )}
    </div>
  );
};