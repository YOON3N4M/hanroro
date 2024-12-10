interface CategorySectionProps {
  format: string;
  label: string;
  release: string;
}

function CategorySection(props: CategorySectionProps) {
  const { format, label, release } = props;

  return (
    <div className="px-[10rem] !pb-[8.5rem] tab:px-[2rem] text-xs flex justify-between animate-fadeIn">
      <div className="flex flex-col">
        <span>Format</span>
        <span>[{format.toUpperCase()}]</span>
      </div>
      <div className="flex">
        <div className="flex flex-col">
          <span>Label</span>
          <span>[{label}]</span>
        </div>
        <div className="flex flex-col ml-[10rem] tab:ml-[2rem]">
          <span>Release</span>
          <span>[{release}]</span>
        </div>
      </div>
    </div>
  );
}

export default CategorySection;
