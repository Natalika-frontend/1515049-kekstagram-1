import { isEscapeKey } from './utils.js';
import { onFullSizePhotoEscKeydown } from './open-full-size-photo.js';

const uploadFileModal = document.querySelector('.img-upload__overlay');
const controlUploadFile = document.querySelector('#upload-file');
const resetButton = uploadFileModal.querySelector('#upload-cancel');
const hashtagInput = uploadFileModal.querySelector('.text__hashtags');
const commentInput = uploadFileModal.querySelector('.text__description');
const effectsList = uploadFileModal.querySelector('.effects__list');
const effectPreviewNone = uploadFileModal.querySelector('.effects__preview--none');
// const effectsPreviewChrome = uploadFileModal.querySelector('.effects__preview--chrome');
const slider = uploadFileModal.querySelector('.img-upload__effect-level');

// const selectedLabel = uploadFileModal.querySelector(`label[for="${selectedRadioInput.id}"]`);
// const selectedLabelText = selectedLabel.textContent.trim();

effectsList.addEventListener('click', (evt) => {
  const input = evt.target.closest('input');
  const selectedRadioInput = uploadFileModal.querySelector('input[name="effect"]:checked');
  const selectedValue = selectedRadioInput.value;
  if (input) {
    if (selectedValue === 'none') {
      slider.classList.add('hidden');
    } else {
      slider.classList.remove('hidden');
    }
  }
});
const isHashtagInputOnFocus = () => document.activeElement === hashtagInput;
const isCommentInputOnFocus = () => document.activeElement === commentInput;
const isEffectPreviewNoneOnFocus = () => document.activeElement === effectPreviewNone;


const resizingImage = () => {

};

/**
 * Закрытие формы загрузки фото при нажатии клавиши esc
 * @param evt
 */
const onUploadFileModalEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    if (!evt.defaultPrevented) {
      evt.preventDefault();
    }
    if (isHashtagInputOnFocus() || isCommentInputOnFocus()) {
      // Без следующей строки при нажатии esc с фокусом на инпуте исчезает класс с body и появляется скролл
      document.removeEventListener('keydown', onFullSizePhotoEscKeydown);
      evt.stopPropagation();
    } else {
      // eslint-disable-next-line no-use-before-define
      closeModal();
    }
  }
};

/**
 * Открытие окна загрузки фото
 */
const openModal = () => {
  // Без следующей строки при нажатии esc с фокусом на инпуте исчезает класс с body и появляется скролл
  document.removeEventListener('keydown', onFullSizePhotoEscKeydown);
  document.body.classList.add('modal-open');
  uploadFileModal.classList.remove('hidden');

  if (isEffectPreviewNoneOnFocus) {
    slider.classList.add('hidden');
  }

  document.addEventListener('keydown', onUploadFileModalEscKeydown);
};

/**
 * Закрытие окна загрузки фото
 */
const closeModal = () => {
  document.body.classList.remove('modal-open');
  uploadFileModal.classList.add('hidden');
  controlUploadFile.value = '';

  document.removeEventListener('keydown', onUploadFileModalEscKeydown);
};

controlUploadFile.addEventListener('change', openModal);
resetButton.addEventListener('click', closeModal);

