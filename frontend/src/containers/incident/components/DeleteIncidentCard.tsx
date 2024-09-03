import { useParams } from "react-router-dom";
import { Button } from "../../../components/ui/Button";
import { Card } from "../../../components/ui/Card";
import { Text } from "../../../components/ui/Text";

export function DeleteIncidentCard() {
  const { id } = useParams();
  const handleDeletePost = () => {
    alert("Delete incident: " + id);
  };
  return (
    <Card className="space-y-6 flex flex-col">
      <Text asChild>
        <span className="tracking-wider">
          Deletar incidente. Você não poderá desfazer esta ação
        </span>
      </Text>
      <Button
        className="w-100 justify-center"
        onClick={handleDeletePost}
        color="danger"
      >
        Deletar incidente
      </Button>
    </Card>
  );
}
