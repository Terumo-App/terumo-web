import { DataType } from "../pages/Collections";

export function mockCollectionsAvailableResult() {
  const tags = ["Public", "Private"];

  const data: DataType[] = [];
  for (let i = 1; i <= 5; i++) {
    data.push({
      key: i.toString(),
      name: `Collection ${i + 1}`,
      owner: `Proprietário ${i + 1}`,
      date: "12-27-2023",
      items: `${i + i * i}`,
      type: tags[i % 2],
    });
  }

  return data;
}

export function mockCollectionsResult() {
  const tags = ["Public", "Private"];

  const data: DataType[] = [];
  for (let i = 1; i <= 20; i++) {
    data.push({
      key: i.toString(),
      name: `Collection ${i + 1}`,
      owner: `Proprietário ${i + 1}`,
      date: "12-27-2023",
      items: `${i + i * i}`,
      type: tags[i % 2],
    });
  }

  return data;
}
