import { mount } from "@vue/test-utils";
import Home from "@/views/Home.vue";

test("Renders a dropdown", () => {
  const wrapper = mount(Home);

  const todo = wrapper.get('[id="app-title"]');

  expect(todo.text()).toContain("Guardianes");
});
