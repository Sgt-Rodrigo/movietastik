const {Activity, Repository} = require('../scripts/index');

describe("demo", function () {
  it("Este test debe pasar siempre", function () {
    expect(4 + 2).toBe(6);
  });
});


describe('checking Repository class', () => {
  let repo;

  beforeEach(() => {
      repo = new Repository();
  });

  it('should have getAllActivities method', () => {
      expect(repo.getAllActivities).toBeDefined();
      expect(typeof repo.getAllActivities).toBe('function');
  });

  it('should have createActivity method', () => {
      expect(repo.createActivity).toBeDefined();
      expect(typeof repo.createActivity).toBe('function');
  });

  it('should have deleteActivity method', () => {
      expect(repo.deleteActivity).toBeDefined();
      expect(typeof repo.deleteActivity).toBe('function');
  });

  it('should create and delete activities', () => {
      repo.createActivity('Title', 'Description', 'image.jpg');
      const activities = repo.getAllActivities();
      expect(activities.length).toBe(1);

      const [activity] = activities;
      expect(activity.title).toBe('Title');
      expect(activity.description).toBe('Description');
      expect(activity.imgUrl).toBe('image.jpg');

      repo.deleteActivity(activity.id);
      expect(repo.getAllActivities().length).toBe(0);
  });
});