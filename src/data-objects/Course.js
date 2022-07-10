import { v4 as uuidv4 } from "uuid";

export const createCourseObject = (title, description, units) => {
  let unitsToAdd = [];
  if (units !== undefined && units.length > 0) {
    unitsToAdd = [...units];
  }

  const course = {
    title: title,
    description: description,
    units: unitsToAdd,
  };

  return course;
};

export const createUnitObject = (title, description, position, lessons, id) => {
  let lessonsToAdd = [];
  if (lessons !== undefined && lessons.length > 0) {
    lessonsToAdd = lessons;
  }

  const unit = {
    id: id,
    description: description,
    position: position,
    title: title,
    lessons: lessonsToAdd,
  };

  return unit;
};

export const createLessonObject = (title, position, videoId, unitId) => {
  const lesson = {
    id: uuidv4(),
    unitId: unitId,
    position: position,
    title: title,
    youtubeVideoId: videoId,
    completed: false,
  };

  return lesson;
};
