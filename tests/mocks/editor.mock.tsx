const mockEditorMethods = {
  setMarkdown: jest.fn(),
  getMarkdown: jest.fn(() => ""),
  focus: jest.fn(),
};
const MockEditor = jest.fn(({ editorRef, value, fieldChange, ...props }) => {
  if (editorRef) {
    editorRef.current = {
      getMarkdown: jest.fn(() => value),
      setMarkdown: jest.fn((markdown: string) => {
        fieldChange(markdown);
      }),
    };
  }

  return (
    <textarea
      data-testid="mdxeditor"
      defaultValue={value}
      ref={editorRef}
      placeholder="Wirte Your Content Here"
      onChange={fieldChange}
      {...props}
    />
  );
});

export { MockEditor, mockEditorMethods };
