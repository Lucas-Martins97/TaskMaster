import { useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import KanbanView from 'app/components/KanbanView';

import ListView from 'app/components/ListView';
import { listOptions } from 'app/config/types';

import useTheme from 'app/utils/hooks/useTheme';
import Theme from 'app/utils/theme';

export default function Home() {
  const { theme } = useTheme();
  const [viewType, setViewType] = useState<string>('Lista');
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  // Opções de visualização disponíveis no seletor de modo (Lista ou Kanban)
  const options: listOptions[] = [
    { label: 'Lista', value: 'Lista' },
    { label: 'Kanban', value: 'Kanban' },
  ];

  // Altera o tipo de visualização e fecha o modal

  const handleSelectOption = (option: listOptions) => {
    setViewType(option.value);
    setModalVisible(false);
  };

  return (
    <View className="mx-auto w-full">
      <View className="mb-[20px] flex w-full flex-row items-center justify-center space-x-4">
        <Text className={`${Theme.getTextColor(theme)} text-center text-[25px] font-bold`}>
          Tarefas -
        </Text>

        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
          }}>
          <Text className={`text-[20px] ${Theme.getTitleColor(theme)}`}> {viewType}</Text>
        </TouchableOpacity>
      </View>

      {/* Modal de seleção de tipo de visualização */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View className="flex-1 items-center justify-center bg-black/50">
          <TouchableOpacity
            className={`${Theme.getBgColor(theme)} mx-auto my-[auto] w-[80%] rounded-[10px] border-[1px] p-[30px] `}
            onPress={() => setModalVisible(false)}>
            <View>
              {options.map((option) => (
                <TouchableOpacity key={option.value} onPress={() => handleSelectOption(option)}>
                  <Text className={`text-center text-[25px] font-bold text-white`}>
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
      {viewType === 'Lista' ? <ListView /> : <KanbanView />}
    </View>
  );
}
