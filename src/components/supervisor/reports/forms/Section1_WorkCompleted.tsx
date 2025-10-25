// src/components/supervisor/reports/forms/Section1_WorkCompleted.tsx
import { useState } from 'react';
import { DailyTask, mockDailyTasks } from '@/data/mock-daily-activity';
import { Plus, Image, Camera, X } from 'lucide-react';

const taskOptions = [
  'Hull Welding',
  'Deck Painting',
  'Engine Inspection',
  'Propeller Maintenance',
  'Electrical Wiring',
  'Other',
];

// Replace these URLs with your actual uploaded image URLs
const taskIconMap: { [key: string]: string } = {
  'Hull Welding': '/images/hull-welding-icon.jpg',
  'Deck Painting': '/images/deck-painting-icon.jpg',
  'Engine Inspection': '/images/engine-inspection-icon.jpg',
  'Propeller Maintenance': '/images/propeller-maintenance-icon.jpg',
  'Electrical Wiring': '/images/electrical-wiring-icon.jpg',
  'Other': '/images/other-icon.jpg',
};

const taskImageMap: { [key: string]: string[] } = {
  'Hull Welding': [
    'https://via.placeholder.com/300x200?text=3D+Hull+Welding+1',
    'https://via.placeholder.com/300x200?text=3D+Hull+Welding+2',
    'https://via.placeholder.com/300x200?text=3D+Hull+Welding+3',
  ],
  'Deck Painting': [
    'https://via.placeholder.com/300x200?text=3D+Deck+Painting+1',
    'https://via.placeholder.com/300x200?text=3D+Deck+Painting+2',
    'https://via.placeholder.com/300x200?text=3D+Deck+Painting+3',
  ],
  'Engine Inspection': [
    'https://via.placeholder.com/300x200?text=3D+Engine+Inspection+1',
    'https://via.placeholder.com/300x200?text=3D+Engine+Inspection+2',
    'https://via.placeholder.com/300x200?text=3D+Engine+Inspection+3',
  ],
  'Propeller Maintenance': [
    'https://via.placeholder.com/300x200?text=3D+Propeller+Maintenance+1',
    'https://via.placeholder.com/300x200?text=3D+Propeller+Maintenance+2',
    'https://via.placeholder.com/300x200?text=3D+Propeller+Maintenance+3',
  ],
  'Electrical Wiring': [
    'https://via.placeholder.com/300x200?text=3D+Electrical+Wiring+1',
    'https://via.placeholder.com/300x200?text=3D+Electrical+Wiring+2',
    'https://via.placeholder.com/300x200?text=3D+Electrical+Wiring+3',
  ],
  Other: [
    'https://via.placeholder.com/300x200?text=3D+Custom+Task+1',
    'https://via.placeholder.com/300x200?text=3D+Custom+Task+2',
  ],
};

const TaskCard = ({
  task,
  index,
  updateTask,
  removeTask,
  addPhoto,
}: {
  task: DailyTask;
  index: number;
  updateTask: (index: number, field: keyof DailyTask, value: string | number) => void;
  removeTask: (index: number) => void;
  addPhoto: (index: number) => void;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customType, setCustomType] = useState(task.type === 'Other' ? '' : task.type);

  const images = taskImageMap[task.type] || taskImageMap.Other;
  const iconImage = taskIconMap[task.type] || taskIconMap.Other;

  const handleTypeChange = (value: string) => {
    if (value === 'Other') {
      updateTask(index, 'type', 'Other');
      setCustomType('');
    } else {
      updateTask(index, 'type', value);
      setCustomType(value);
    }
  };

  return (
    <div className="group relative border-2 border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300">
      {/* Card Header with Task Icon */}
      <div
        className="relative h-48 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 cursor-pointer overflow-hidden group-hover:from-blue-100 group-hover:via-indigo-100 group-hover:to-purple-100 transition-all duration-300"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <img 
            src={iconImage} 
            alt={`${task.type} icon`}
            className="w-32 h-32 object-contain transition-all duration-300 group-hover:scale-110 drop-shadow-lg"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-gray-700 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-100 scale-90">
          <Image className="w-3 h-3 inline mr-1" />
          View 3D Images
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 space-y-4">
        {/* Task Type Selector */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
            Task Type
          </label>
          <select
            value={task.type}
            onChange={(e) => handleTypeChange(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-800 font-semibold bg-white hover:border-blue-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 cursor-pointer"
          >
            {taskOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Custom Type Input */}
        {task.type === 'Other' && (
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
              Custom Task Name
            </label>
            <input
              type="text"
              value={customType}
              onChange={(e) => {
                setCustomType(e.target.value);
                updateTask(index, 'type', e.target.value || 'Other');
              }}
              placeholder="Enter custom task type"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-800 font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
            />
          </div>
        )}
        
        {/* Photo Section - Enhanced Design */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border-2 border-blue-100">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Camera className="w-6 h-6 text-white" />
                </div>
                {task.photoCount > 0 && (
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center border-2 border-white shadow-md">
                    <span className="text-white font-bold text-xs">{task.photoCount}</span>
                  </div>
                )}
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-700">
                  {task.photoCount === 0 ? 'No photos yet' : `${task.photoCount} ${task.photoCount === 1 ? 'Photo' : 'Photos'}`}
                </div>
                <div className="text-xs text-gray-500">
                  Document your progress
                </div>
              </div>
            </div>
          </div>
          
          <button
            onClick={() => addPhoto(index)}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium rounded-lg transition-colors duration-200"
          >
            <Plus className="w-5 h-5" />
            Add Photo
          </button>
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-5 pb-5">
        <button
          onClick={() => removeTask(index)}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-red-600 hover:text-white hover:bg-red-600 border-2 border-red-200 hover:border-red-600 rounded-xl font-semibold transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <X className="w-4 h-4" />
          Remove Task
        </button>
      </div>

      {/* Modal for 3D Image Preview */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl p-6 max-w-3xl w-full max-h-[85vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-gray-100">
              <div>
                <h3 className="text-2xl font-bold text-gray-800">
                  {task.type === 'Other' && customType ? customType : task.type}
                </h3>
                <p className="text-sm text-gray-500 mt-1">3D Reference Images</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 text-gray-600 hover:text-gray-800 transition-all duration-200 transform hover:rotate-90"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {images.map((image, idx) => (
                <div key={idx} className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
                  <img
                    src={image}
                    alt={`${task.type} 3D Image ${idx + 1}`}
                    className="w-full h-56 object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-3 left-3 text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Image {idx + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function Section1_WorkCompleted() {
  const [tasks, setTasks] = useState<DailyTask[]>(mockDailyTasks);

  const addTask = () => {
    setTasks([...tasks, { type: 'Hull Welding', photoCount: 0 }]);
  };

  const updateTask = (index: number, field: keyof DailyTask, value: string | number) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = { ...updatedTasks[index], [field]: value };
    setTasks(updatedTasks);
  };

  const removeTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const addPhoto = (index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = {
      ...updatedTasks[index],
      photoCount: updatedTasks[index].photoCount + 1,
    };
    setTasks(updatedTasks);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Section 1: Work Completed</h2>
          <p className="text-sm text-gray-500 mt-1">Document today's tasks and progress</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-12 px-4 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300">
            <Camera className="w-16 h-16 text-gray-400 mb-4" />
            <p className="text-gray-600 font-medium mb-2">No tasks added yet</p>
            <p className="text-gray-400 text-sm">Click the button below to add your first task</p>
          </div>
        ) : (
          tasks.map((task, index) => (
            <TaskCard
              key={index}
              task={task}
              index={index}
              updateTask={updateTask}
              removeTask={removeTask}
              addPhoto={addPhoto}
            />
          ))
        )}
      </div>
      
      <button
        onClick={addTask}
        className="font-semibold text-blue-600 hover:text-blue-800 text-sm mt-4"
      >
        +
        Add Another Task
      </button>
    </div>
  );
}