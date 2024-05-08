// components/TagsInput.tsx

import React, { useState } from 'react';
import { Input, Chip } from '@nextui-org/react';

const TagsInput: React.FC = ({ tags, handleTagsChange }) => {
  const [tagInput, setTagInput] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const newTag = tagInput.trim();
      if (newTag) {
        handleTagsChange([...tags, newTag]);
        setTagInput('');
      }
    }
  };

  const handleTagRemove = (tagToRemove: string) => {
    handleTagsChange(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex gap-2'>
        {tags.length > 0 ? tags.map((tag, index) => (
          <Chip
            key={index}
            isCloseable
            onClose={() => handleTagRemove(tag)}
          >
            {tag}
          </Chip>
        )):
        'No any tag.'}
      </div>
      <Input
        value={tagInput}
        placeholder="Enter tags..."
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
      />
    </div>
  );
};

export default TagsInput;
