export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  body: string;
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBodyChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  error: string | null;
  modalTitle: string;
};
