import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { checkNickname, updateUserProfile } from '@/app/actions/mypage';
import { createClient } from '@/utils/supabase/client';

type User = {
  nickname: string;
  profile_image: string | null;
};

const useProfileEdit = (user: User | null, onClose: () => void) => {
  const queryClient = useQueryClient();
  const [originalNickname, setOriginalNickname] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    if (user) {
      setOriginalNickname(user.nickname);
      setNickname(user.nickname);
      setPreview(
        user.profile_image || '/assets/icons/default_profile_image.svg',
      );
    }
  }, [user]);

  const mutation = useMutation<void, Error, void>({
    mutationFn: async () => {
      if (!nickname.trim()) {
        throw new Error('닉네임을 입력해주세요.');
      }

      // 닉네임 중복 확인
      if (nickname !== originalNickname) {
        const isDuplicate = await checkNickname(nickname);
        if (isDuplicate) {
          throw new Error('이미 존재하는 닉네임입니다.');
        }
      }

      let profileImageUrl: string | null = null;

      if (selectedFile) {
        const supabase = createClient();
        const fileName = `${Date.now()}_${selectedFile.name}`;
        const { data, error } = await supabase.storage
          .from('profile_images')
          .upload(fileName, selectedFile);

        if (error) throw new Error(error.message);

        profileImageUrl = supabase.storage
          .from('profile_images')
          .getPublicUrl(data.path).data.publicUrl;
      }

      await updateUserProfile({
        nickname,
        profile_image: profileImageUrl || undefined,
      });
    },
    onSuccess: () => {
      queryClient.setQueryData(['userProfile'], (oldData: User | undefined) => {
        if (!oldData) return null;
        return {
          ...oldData,
          nickname,
          profile_image: preview,
        };
      });

      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
      onClose();
    },
    onError: (error: Error) => {
      setErrorMessage(error.message);
    },
  });

  const handleFileChange = (file: File | null) => {
    setSelectedFile(file);
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleUpdateProfile = () => {
    setErrorMessage('');
    mutation.mutate();
  };

  const handleNicknameChange = (value: string) => {
    setNickname(value);
    setErrorMessage('');
  };

  const resetNickname = () => {
    setNickname(originalNickname);
    setErrorMessage('');
  };

  return {
    nickname,
    setNickname: handleNicknameChange,
    preview,
    handleFileChange,
    handleUpdateProfile,
    errorMessage,
    resetNickname,
  };
};

export default useProfileEdit;
