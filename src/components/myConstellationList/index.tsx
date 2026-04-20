import React from "react";
import Image from "next/image";
import star from "/public/starCount.svg";
import addStar from "/public/addStar_dark.svg";
import { AddCard, Card, Count, Label, List, Name, PetImage, Plus } from "./styles";

interface Constellation {
  id: number;
  name: string;
  count: number;
  imageUrl: string;
}

interface Props {
  constellations: Constellation[];
}

const ConstellationList: React.FC<Props> = ({ constellations }) => {
  if (constellations.length == 0) {
    return (
      <List>
        <AddCard>
          <Label>별자리 추가</Label>
          <Plus>
            <Image src={addStar} alt="add star" />
          </Plus>
        </AddCard>
      </List>
    );
  }

  return (
    <List>
      {constellations.map((c) => (
        <Card key={c.id}>
          <Name>{c.name}</Name>
          <PetImage src={c.imageUrl} alt={c.name} width={60} height={60} />
          <Count><Image src={star} alt={star} /> {c.count}개</Count>
        </Card>
      ))}
    </List>
  );
};

export default ConstellationList;
