import {MutableRefObject} from 'react';
import {Editor} from '@tiptap/react';

export function getReplyBody(
  editorRef: MutableRefObject<Editor | null>
): string | null {
  let body = editorRef.current?.getHTML() ?? '';
  body = body.replace('<p></p>', '');
  return body || null;
}
