import { BUCKET_NAME } from "@/lib/constants";
import supabase from "@/lib/supabase";

export async function uploadImage({
  file,
  filePath,
}: {
  file: File;
  filePath: string;
}) {
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, file);

  if (error) throw error;

  // 그냥 return data 하면 안 됨! (이미지가 저장된 주소만 반환해야 하므로)
  const {
    data: { publicUrl },
  } = supabase.storage.from(BUCKET_NAME).getPublicUrl(data.path);

  return publicUrl;
}
