import { create } from "zustand";

export type GalleryViewType = "gallery" | "carousel";
export type ImageType = "image" | "gif" | null;

interface GalleryStore {
  galleryViewType: GalleryViewType;
  imageType: ImageType;
  uniqueTagList: string[];
  seletedTagList: string[];
  actions: {
    setViewType: (galleryViewType: GalleryViewType) => void;
    setImageType: (imageType: ImageType) => void;
    setUniqueTagList: (tagList: string[]) => void;
    setSelectedTagList: (tag: string) => void;
  };
}

const useGalleryStore = create<GalleryStore>((set) => ({
  galleryViewType: "gallery",
  imageType: null,
  uniqueTagList: [],
  seletedTagList: [],
  actions: {
    setViewType: (galleryViewType) => set({ galleryViewType }),
    setImageType: (imageType) => set({ imageType }),
    setUniqueTagList: (uniqueTagList) => set({ uniqueTagList }),
    setSelectedTagList: (tag) =>
      set((state) => {
        if (state.seletedTagList.includes(tag)) {
          const newArr = state.seletedTagList.filter((item) => item !== tag);
          return { seletedTagList: newArr };
        } else {
          return { seletedTagList: [...state.seletedTagList, tag] };
        }
      }),
  },
}));

export const useGalleryViewType = () =>
  useGalleryStore((state) => state.galleryViewType);
export const useImageType = () => useGalleryStore((state) => state.imageType);
export const useUniqueTagList = () =>
  useGalleryStore((state) => state.uniqueTagList);
export const useSelectedTagList = () =>
  useGalleryStore((state) => state.seletedTagList);

export const useGalleryActions = () =>
  useGalleryStore((state) => state.actions);
