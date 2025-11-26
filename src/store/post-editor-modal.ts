import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";

type CreateMode = {
  isOpen: true;
  type: "CREATE";
};

type EditMode = {
  isOpen: true;
  type: "EDIT";
  postId: number;
  content: string;
  imageUrls: string[] | null;
};

type OpenState = CreateMode | EditMode;

type CloseState = {
  isOpen: false;
};

type State = CloseState | OpenState;

const initialState = {
  isOpen: false,
} as State;

const usePostEditorModalStore = create(
  devtools(
    combine(initialState, (set) => ({
      actions: {
        openCreate: () => {
          set({ isOpen: true, type: "CREATE" });
        },
        openEdit: (param: Omit<EditMode, "isOpen" | "type">) => {
          set({ isOpen: true, type: "EDIT", ...param });
        },
        close: () => {
          set({ isOpen: false });
        },
      },
    })),
    { name: "postEditorModalStore" },
  ),
);

/* 포스트 생성을 위해 모달을 여는 커스텀 Hook */
export const useOpenCreatePostModal = () => {
  const openCreate = usePostEditorModalStore(
    (store) => store.actions.openCreate,
  );
  return openCreate;
};

/* 포스트 수정을 위해 모달을 여는 커스텀 Hook */
export const useOpenEditPostModal = () => {
  const openEdit = usePostEditorModalStore((store) => store.actions.openEdit);
  return openEdit;
};

/* 모달 스토어의 모든 액션과 상태를 불러오는 커스텀 Hook */
export const usePostEditorModal = () => {
  const store  = usePostEditorModalStore();
  return store as typeof store & State;
};
