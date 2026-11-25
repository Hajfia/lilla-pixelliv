import { create } from "zustand"

export type ModalItem = "clock" | "painting" | "mp3"

type UiState = {
  openItem: ModalItem | null
  originRect: DOMRect | null
  openModal: (item: ModalItem, originRect: DOMRect) => void
  closeModal: () => void
}

export const useUiStore = create<UiState>()((set) => ({
  openItem: null,
  originRect: null,
  openModal: (item, originRect) => set({ openItem: item, originRect }),
  closeModal: () => set({ openItem: null, originRect: null }),
}))
