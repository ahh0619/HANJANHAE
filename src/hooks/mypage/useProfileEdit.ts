import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { updateUserProfile } from '@/utils/mypage/action';
import { createClient } from '@/utils/supabase/client';

type User = {
  nickname: string;
  profile_image: string | null;
};

const useProfileEdit = (user: User | null, onClose: () => void) => {
  const queryClient = useQueryClient();
  const [nickname, setNickname] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setNickname(user.nickname);
      setPreview(user.profile_image || '/default-avatar.png');
    }
  }, [user]);

  const mutation = useMutation<void, Error, void>({
    mutationFn: async () => {
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
      // 캐시 수동 업데이트
      queryClient.setQueryData(['userProfile'], (oldData: User | undefined) => {
        if (!oldData) return null;
        return {
          ...oldData,
          nickname,
          profile_image: preview, // 로컬 상태의 미리보기 이미지로 갱신
        };
      });

      // 캐시 무효화로 서버에서 최신 데이터 가져오기
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
      alert('프로필이 성공적으로 수정되었습니다!');
      onClose();
    },
    onError: (error) => {
      console.error('프로필 업데이트 실패:', error);
      alert('프로필 수정 중 오류가 발생했습니다.');
    },
  });

  const handleFileChange = (file: File | null) => {
    setSelectedFile(file);
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleUpdateProfile = () => {
    mutation.mutate();
  };

  return {
    nickname,
    setNickname,
    preview,
    handleFileChange,
    handleUpdateProfile,
  };
};

export default useProfileEdit;
