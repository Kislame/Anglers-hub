'use client';
import { EditorForm } from '@/components/editor/EditorForm';
import { useEdgeStore } from '@/lib/edgestore';
import { useState } from 'react';

import { SingleImageDropzone } from '@/components/editor/SingleImageDropzone';
import TagsCom from '@/components/tags/tags';
const EditorPage = () => {
  return <EditorForm />;
};

export default EditorPage;
